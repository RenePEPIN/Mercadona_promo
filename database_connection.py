import psycopg2

# Connect to your PostgreSQL database
conn = psycopg2.connect(
    database="base_de_donnees_mercadona",
    user="postgres",
    password="Angatsy1984",
    host="localhost",
    port="",  # Port par défaut de PostgreSQL
)

# Ouvrir un curseur pour effectuer des opérations de base de données
cur = conn.cursor()

# Exécuter une requête SQL
cur.execute("SELECT * FROM my_data")

# Récupérer les résultats de la requête
records = cur.fetchall()

# Fermer le curseur et la connexion
cur.close()
conn.close()
