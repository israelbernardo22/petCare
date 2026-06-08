# PetCare

Sistema de gerenciamento de pets e cuidados veterinários.

## Requisitos

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) instalado e rodando

## Como executar

### 1. Clone o repositório

```bash
git clone https://github.com/israelbernardo22/petCare.git
cd petCare
```

### 2. Crie o arquivo de configuração do backend

```bash
echo DATABASE_URL="mysql://avnadmin:AVNS_7Uup5mQITg7j3ibF7wf@mysql-pet21af7666-unifei-0d66.l.aivencloud.com:20820/defaultdb?ssl-mode=REQUIRED" > backend/.env
echo JWT_SECRET=PETCARE2026 >> backend/.env
```

> No Windows (PowerShell), use:
> ```powershell
> "DATABASE_URL=`"mysql://avnadmin:AVNS_7Uup5mQITg7j3ibF7wf@mysql-pet21af7666-unifei-0d66.l.aivencloud.com:20820/defaultdb?ssl-mode=REQUIRED`"" | Out-File -FilePath backend\.env -Encoding utf8
> "JWT_SECRET=PETCARE2026" | Out-File -FilePath backend\.env -Append -Encoding utf8
> ```

### 3. Suba os containers

```bash
docker compose up --build -d
```

> O build leva alguns minutos na primeira vez.

### 4. Acesse a aplicação

Abra o navegador em: **http://localhost**

---

## Parar a aplicação

```bash
docker compose down
```

## Stack

- **Frontend:** Angular 21 + Bootstrap 5
- **Backend:** Node.js + Express + Prisma
- **Banco de dados:** MySQL (Aiven Cloud)
- **Infraestrutura:** Docker + Nginx
