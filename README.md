# Open Art Catalog

Projeto para descoberta, catalogação e disponibilização de obras
em domínio público (CC0) provenientes das coleções do Paris Musées.

As obras são extraídas via GraphQL, enriquecidas com metadados,
imagens em alta resolução e links de download, e armazenadas em
PostgreSQL para consumo por uma API FastAPI e frontend React.

## Tecnologias

- Python
- FastAPI
- SQLAlchemy
- PostgreSQL
- GraphQL
- GitHub

## Arquitetura

```text
Paris Musées
        ↓
GraphQL API
        ↓
NodeOeuvre
        ↓
Detecção de CC0
        ↓
PostgreSQL
        ↓
FastAPI
        ↓
Frontend React
```

## Scripts

### Importação inicial

```bash
python -m scripts.import_paris_musees
```

Importa obras da API GraphQL.

---

### Exploração GraphQL

```bash
python -m scripts.explore_graphql
```

Investiga o schema GraphQL e experimenta consultas.

---

### Importação de obras CC0

```bash
python -m scripts.import_cc0_artworks
```

Localiza obras CC0, extrai:

- título
- autor
- museu
- imagem HD
- licença
- download

e salva no PostgreSQL.

## Endpoints

### Listar obras CC0

```http
GET /cc0-artworks
```

---

### Obter uma obra

```http
GET /cc0-artworks/{id}
```

---

### Pesquisar

```http
GET /cc0-artworks/search?q=cravate
```

---

### Estatísticas

```http
GET /cc0-artworks/stats
```

## Tabelas

### artworks

Catálogo legado utilizado durante os primeiros experimentos.

### cc0_artworks

Catálogo principal contendo apenas obras CC0.


## Instalação

```bash
git clone https://github.com/brunorrmachado/musees-digital-catalog.git

cd musees-digital-catalog/backend

python -m venv .venv
