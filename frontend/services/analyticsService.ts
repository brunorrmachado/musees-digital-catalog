const API_URL = "http://localhost:8000";

export async function getSummary() {
  const response = await fetch(
    `${API_URL}/analytics/summary`,
    {
      cache: "no-store",
    }
  );

  return response.json();
}

export async function getAcquisitionMethods() {
  const response = await fetch(
    `${API_URL}/analytics/acquisition-methods`,
    {
      cache: "no-store",
    }
  );

  return response.json();
}

export async function getItemTypes() {
  const response = await fetch(
    `${API_URL}/analytics/item-types`,
    {
      cache: "no-store",
    }
  );

  return response.json();
}

export async function getProductionYears() {
  const response = await fetch(
    `${API_URL}/analytics/production-years`,
    {
      cache: "no-store",
    }
  );

  return response.json();
}

export async function getCenturies() {
  const response = await fetch(
    `${API_URL}/analytics/centuries`,
    {
      cache: "no-store",
    }
  );

  return response.json();
}
