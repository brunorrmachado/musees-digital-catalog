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
  ) {
    entities {
      entityLabel
      entityBundle
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

print(response.status_code)

print(response.text)