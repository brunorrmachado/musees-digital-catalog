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
    limit: 1
    filter: {
      conditions: [
        {
          field: "uuid"
          value: "c1e8311d-419a-4b5b-8902-b60500865c4d"
        }
      ]
    }
  ) {
    entities {
      entityId
      entityUuid
      entityLabel
      entityBundle
      entityType
      __typename
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