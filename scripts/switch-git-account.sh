#!/usr/bin/env bash
# switch-git-account.sh
# Script para cambiar rápidamente entre tus cuentas de Git/GitHub (personal y trabajo)
# Uso:
#   ./scripts/switch-git-account.sh personal [--global]
#   ./scripts/switch-git-account.sh trabajo  [--global]
# Aliases aceptados:
#   personal: personal, perso, gusrsl
#   trabajo:  trabajo, empresa, work, gusrslmb
#
# Nota:
# - Sin --global, la configuración (user.name/user.email) se aplica SOLO al repo actual.
# - Con --global, se aplica para todos tus repos en la máquina.
# - Requiere GitHub CLI (gh) instalado y logueado en ambas cuentas.

set -euo pipefail

print_usage() {
  cat <<EOF
Uso:
  $0 personal [--global]
  $0 trabajo  [--global]

Descripción:
  Cambia la cuenta activa de GitHub CLI y ajusta git user.name/user.email
  a tus perfiles personal (gusrsl) o trabajo (gusrslmb).

Flags:
  --global   Aplica la configuración de git de forma global en lugar de local al repo.

Aliases:
  personal: personal, perso, gusrsl
  trabajo:  trabajo, empresa, work, gusrslmb
EOF
}

if ! command -v gh >/dev/null 2>&1; then
  echo "[ERROR] No se encontró 'gh' (GitHub CLI). Instálalo con: brew install gh" >&2
  exit 1
fi

TARGET=""
GLOBAL=false

for arg in "$@"; do
  case "$arg" in
    --global) GLOBAL=true ;;
    personal|perso|gusrsl) TARGET="personal" ;;
    trabajo|empresa|work|gusrslmb) TARGET="trabajo" ;;
    -h|--help) print_usage; exit 0 ;;
    *) echo "[ERROR] Opción no reconocida: $arg" >&2; print_usage; exit 1 ;;
  esac
done

if [[ -z "${TARGET}" ]]; then
  echo "[ERROR] Debes indicar 'personal' o 'trabajo'." >&2
  print_usage
  exit 1
fi

# Definir datos según el target
if [[ "${TARGET}" == "personal" ]]; then
  GH_USER="gusrsl"
  GIT_NAME="Gustavo Rodriguez"
  GIT_EMAIL="gustavemiliors@gmail.com"
  OTHER_USER="gusrslmb"
else
  GH_USER="gusrslmb"
  GIT_NAME="Gustavo Rodriguez"
  GIT_EMAIL="adesarrollo2.tic@marbelize.com"
  OTHER_USER="gusrsl"
fi

# Verificar que la cuenta esté autenticada en gh
if ! gh auth status -h github.com 2>/dev/null | grep -q "account ${GH_USER}"; then
  echo "[ERROR] No estás autenticado en GitHub CLI con la cuenta '${GH_USER}'." >&2
  echo "        Ejecuta: gh auth login --hostname github.com --web --scopes 'repo' --git-protocol https" >&2
  exit 1
fi

# Cambiar cuenta activa en gh
echo "[INFO] Cambiando cuenta activa de GitHub CLI a '${GH_USER}'..."
gh auth switch --hostname github.com --user "${GH_USER}" >/dev/null

# Configurar helper de credenciales de gh para git
echo "[INFO] Configurando GitHub CLI como helper de credenciales para git..."
gh auth setup-git --hostname github.com >/dev/null

# Limpiar posibles credenciales cacheadas del otro usuario en keychain
clear_cred() {
  local username="$1"
  git credential reject <<EOF >/dev/null
protocol=https
host=github.com
username=${username}
password=x

EOF
}

clear_cred "${OTHER_USER}" || true

# Aplicar git config (local o global)
SCOPE="--local"
if [[ "$GLOBAL" == true ]]; then
  SCOPE="--global"
fi

echo "[INFO] Estableciendo git ${SCOPE#--} user.name y user.email..."
git config ${SCOPE} user.name "${GIT_NAME}"
git config ${SCOPE} user.email "${GIT_EMAIL}"

# Mostrar estado final
ACTIVE_ACC=$(gh auth status -h github.com 2>/dev/null | awk '
  /account/ { user=$6 }
  /Active account: true/ { print user; exit }
')
CURRENT_NAME=$(git config --get user.name || true)
CURRENT_EMAIL=$(git config --get user.email || true)

echo ""
echo "[OK] Cuenta activa de gh: ${ACTIVE_ACC:-desconocida}"
echo "[OK] git user.name: ${CURRENT_NAME:-no definido}"
echo "[OK] git user.email: ${CURRENT_EMAIL:-no definido}"
echo ""
echo "Listo. Si ves algún 403 al hacer push, prueba de nuevo: a veces Git guarda credenciales antiguas y ya las limpiamos arriba."