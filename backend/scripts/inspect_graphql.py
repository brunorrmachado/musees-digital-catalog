import os
import json
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
  nodeQuery(
    limit: 5
    filter: {
      conditions: [
        {
          field: "type"
          value: "oeuvre"
        }
      ]
    }
  ) {
    entities {

      entityLabel
      entityUuid

      ... on NodeOeuvre {

        fieldMusee {
          entity {
            name
          }
        }

      }

    }
  }
}
"""

try:

    response = requests.post(
        URL,
        json={"query": query},
        headers=headers,
        timeout=60
    )

    print("Status:", response.status_code)
    print(response.text)

except Exception as e:
    print("Erro:", e)