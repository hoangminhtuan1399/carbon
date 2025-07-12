import { v4 as uuidv4 } from 'uuid'

const generateStandardFactors = () => {
  const factors = []
  const fuelTypes = ['Diesel', 'Coal', 'Electricity', 'Biomass', 'None']
  const combustionTypes = ['Stationary', 'Mobile', 'None']
  const technologyTypes = ['Generator', 'Furnace', 'Processing', 'Solar Panel', 'Hydropower']
  const activityUnits = ['L', 'ton', 'kWh', 'kg']

  // Tạo tất cả tổ hợp code cho 6 level, mỗi level 2 mục
  let id = 1
  for (let l1 = 1; l1 <= 2; l1++) {
    for (let l2 = 1; l2 <= 2; l2++) {
      for (let l3 = 1; l3 <= 2; l3++) {
        for (let l4 = 1; l4 <= 2; l4++) {
          for (let l5 = 1; l5 <= 2; l5++) {
            for (let l6 = 1; l6 <= 2; l6++) {
              const code = `${l1}.${l2}.${l3}.${l4}.${l5}.${l6}`
              const fuelType = fuelTypes[Math.floor(Math.random() * fuelTypes.length)]
              const activityUnit = activityUnits[Math.floor(Math.random() * activityUnits.length)]
              const co2 = parseFloat((Math.random() * 3).toFixed(2))
              factors.push({
                id: id++,
                uuid: uuidv4(),
                code: code,
                name: `Standard Factor ${code}`,
                vi_name: `Yếu tố tiêu chuẩn ${code}`,
                description: `Emission factor for ${fuelType.toLowerCase()} in level ${code}`,
                vi_description: `Yếu tố phát thải cho ${fuelType.toLowerCase()} ở cấp ${code}`,
                scope: Math.floor(Math.random() * 2) + 1, // 1 or 2
                fuel_type: fuelType,
                combustion_type: combustionTypes[Math.floor(Math.random() * combustionTypes.length)],
                technology_type: technologyTypes[Math.floor(Math.random() * technologyTypes.length)],
                activity_unit: activityUnit,
                emission_unit: "KG_CO2E",
                calc_method: "Emission Factor",
                formula: `ad * EF_${fuelType.toLowerCase()}`,
                co2: co2,
                ch4: parseFloat((Math.random() * 0.1).toFixed(4)),
                n2o: parseFloat((Math.random() * 0.01).toFixed(5)),
                is_mandatory: Math.random() > 0.5,
                min_threshold: 0,
                max_threshold: Math.floor(Math.random() * 5000) + 500,
                source: "IPCC 2006",
                effective_from: "2020-01-01",
                effective_to: "2030-12-31",
                uncertainty_pct: Math.floor(Math.random() * 5) + 1,
                ref_doc: "IPCC Guidelines 2006",
                expert_notes: `Based on ${fuelType.toLowerCase()} emission factors`,
                calculation_example: `100 ${activityUnit} * ${co2} kg CO2e/${activityUnit} = ${100 * co2} kg CO2e`,
                tags: `${fuelType.toLowerCase()}, standard`,
              })
            }
          }
        }
      }
    }
  }

  return {
    data: factors,
    meta: {
      statusCode: 200,
      message: "OK",
      success: true,
      action: "",
      pagination: {
        start: 0,
        limit: 64,
        total: factors.length,
        page: 1,
        totalPages: 1
      }
    }
  }
}

export const mockStandardFactors = generateStandardFactors()
