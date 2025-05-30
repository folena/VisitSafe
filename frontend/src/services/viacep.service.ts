import type { AddressDTO } from "@/api/models/AddressDTO";

/**
 * Busca um endereço completo a partir do CEP fornecido.
 * 
 * Essa função consulta a API pública do ViaCEP (https://viacep.com.br/)
 * e retorna os dados de endereço em formato compatível com AddressDTO.
 * 
 * @param zipCode CEP no formato "01000-000" ou "01000000"
 * @returns Os dados de endereço (sem número e complemento) ou `null` se o CEP for inválido ou não encontrado.
 */
export async function getAddressByZipCode(
  zipCode: string
): Promise<Partial<AddressDTO> | null> {
  const cleaned = zipCode.replace(/\D/g, "");
  if (cleaned.length !== 8) return null;

  try {
    const response = await fetch(`https://viacep.com.br/ws/${cleaned}/json/`);
    if (!response.ok) return null;

    const data = await response.json();
    if (data.erro) return null;

    return {
      street: data.logradouro || "",
      neighborhood: data.bairro || "",
      city: data.localidade || "",
      state: data.uf || "",
    };
  } catch (error) {
    console.error("Erro ao buscar endereço por CEP:", error);
    return null;
  }
}
