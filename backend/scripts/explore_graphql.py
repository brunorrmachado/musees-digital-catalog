import os
import requests
from dotenv import load_dotenv

load_dotenv()

TOKEN = os.getenv("API_TOKEN")

URL = "https://apicollections.parismusees.paris.fr/graphql"

headers = {
    "Authorization": f"Bearer {TOKEN}",
    "Content-Type": "application/json"
}

query = """
{
  nodeById(id: "189242") {

    ... on NodeOeuvre {

      title

      absolutePath

      fieldUrlAlias

    }

  }
}
"""

response = requests.post(
    URL,
    json={"query": query},
    headers=headers,
    timeout=60
)

print(response.json())