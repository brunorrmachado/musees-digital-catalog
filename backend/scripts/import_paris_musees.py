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

        title

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

    session = requests.Session()

    response = session.post(
        URL,
        json={"query": query},
        headers=headers,
        timeout=(30, 120)
    )

    response = requests.post(
        URL,
        json={"query": query},
        headers=headers,
        timeout=60,
        stream=True
    )

    print("Status Code:")
    print(response.status_code)

    print("\nPrimeiros 1000 caracteres:")

    content = response.raw.read(1000)

    print(content.decode("utf-8", errors="ignore"))

    

except requests.exceptions.RequestException as e:
    print("Erro HTTP:")
    print(e)