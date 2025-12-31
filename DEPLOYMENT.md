# Deployment Guide - Inazuma Player Randomizer

## Pre-requisitos
1. ✅ Raspberry Pi con Docker instalado
2. ✅ Nginx Proxy Manager configurado (puerto 8181)
3. ✅ DuckDNS configurado
4. ✅ Puerto 443 abierto en router

## Paso 1: Build del Frontend (en tu PC)
```bash
cd frontend
npm install
npm run build
```

## Paso 2: Subir a GitHub
```bash
git add .
git commit -m "Add deployment configuration"
git push origin main
```

## Paso 3: En la Raspberry Pi
```bash
# Clonar o actualizar
git clone https://github.com/tu-usuario/inazuma-player-randomizer.git
cd inazuma-player-randomizer

# Levantar servicios
docker-compose up -d --build
```

## Paso 4: Nginx Proxy Manager
- Domain: `inazuma.tu-subdominio.duckdns.org`
- Forward: `localhost:8001`
- SSL: ✅ Activar Let's Encrypt

## Paso 5: DuckDNS
- Crear: `inazuma.duckdns.org`
- Apuntar a tu IP pública

## Verificar
```bash
# Local
curl http://localhost:8001/api/characters?size=5

# Externo
https://inazuma.tu-subdominio.duckdns.org
```

## Actualizar
```bash
git pull
docker-compose down
docker-compose up -d --build
```
