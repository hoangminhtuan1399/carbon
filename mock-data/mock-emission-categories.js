import { v4 as uuidv4 } from 'uuid';
import { mockProjects } from './mock-projects.js';

const generateRandomEmissionCategories = (count = 10) => {
  const emissionCategories = [];
  const baseDate = new Date('2025-07-05T18:56:34.011Z');
  const fuelTypes = ['Diesel', 'Coal', 'Electricity', 'Biomass', 'None'];
  const combustionTypes = ['Stationary', 'Mobile', 'None'];
  const technologyTypes = ['Generator', 'Furnace', 'Processing', 'Solar Panel', 'Hydropower'];
  const activityUnits = ['L', 'ton', 'kWh', 'kg'];

  for (let i = 1; i <= count; i++) {
    const createdAt = new Date(baseDate.getTime() - i * 24 * 60 * 60 * 1000); // Giảm 1 ngày cho mỗi category
    const state = Math.floor(Math.random() * 3) - 1; // -1, 0, hoặc 1
    const projectId = Math.floor(Math.random() * 10) + 1; // 1 đến 10
    const facilityId = Math.floor(Math.random() * 50) + 1; // 1 đến 10
    const createdBy = Math.floor(Math.random() * 10); // 0 đến 9
    const updatedBy = createdBy;
    const scope = Math.floor(Math.random() * 2) + 1; // 1 hoặc 2
    const project = mockProjects.data.find(p => p.id === projectId);
    const sectorId = project ? project.sector_id : 1; // Lấy sector_id từ project
    const effectiveFrom = project ? project.start_date : '2023-01-01';
    const effectiveTo = project ? project.end_date : '2023-12-31';
    const fuelType = fuelTypes[Math.floor(Math.random() * fuelTypes.length)];
    const activityUnit = activityUnits[Math.floor(Math.random() * activityUnits.length)];
    const co2 = parseFloat((Math.random() * 3).toFixed(2))

    emissionCategories.push({
      id: i,
      uuid: uuidv4(),
      created_at: createdAt.toISOString(),
      created_by: createdBy,
      updated_at: createdAt.toISOString(),
      updated_by: updatedBy,
      state: state,
      version: 0,
      std_id: Math.floor(Math.random() * 3) + 1, // 1 đến 3
      sector_id: sectorId,
      project_id: projectId,
      facility_id: facilityId,
      code: `EMISSION_CAT_${i}`,
      scope: scope,
      vi_name: `Danh mục phát thải ${i}`,
      vi_description: "Phát thải từ hoạt động sản xuất hoặc tiêu thụ năng lượng trong cơ sở",
      name: `Emission Category ${i}`,
      description: "Emissions from production or energy consumption activities in the facility",
      region: "VN",
      fuel_type: fuelType,
      combustion_type: combustionTypes[Math.floor(Math.random() * combustionTypes.length)],
      technology_type: technologyTypes[Math.floor(Math.random() * technologyTypes.length)],
      formula_type: 0,
      activity_unit: activityUnit,
      emission_unit: "KG_CO2E",
      calc_method: "Emission Factor",
      formula: `ad * EF_${fuelType.toLowerCase()}`,
      co2: co2, // 0 đến 3
      ch4: parseFloat((Math.random() * 0.1).toFixed(4)), // 0 đến 0.1
      n2o: parseFloat((Math.random() * 0.01).toFixed(5)), // 0 đến 0.01
      is_mandatory: Math.random() > 0.5,
      min_threshold: 0,
      max_threshold: Math.floor(Math.random() * 5000) + 500, // 500 đến 5500
      source: "IPCC 2006",
      effective_from: effectiveFrom,
      effective_to: effectiveTo,
      uncertainty_pct: Math.floor(Math.random() * 5) + 1, // 1 đến 5
      ref_doc: "IPCC Guidelines 2006",
      expert_notes: `Based on ${fuelType.toLowerCase()} emission factors`,
      calculation_example: `100 ${activityUnit} * ${co2} kg CO2e/${activityUnit} = ${100 * co2} kg CO2e`,
      tags: `${fuelType.toLowerCase()}, emission`,
      metadata: {}
    });
  }

  return {
    data: emissionCategories,
    meta: {
      statusCode: 200,
      message: "OK",
      success: true,
      action: "",
      pagination: {
        start: 0,
        limit: 25,
        total: count,
        page: 1,
        totalPages: 1
      }
    }
  };
};

export const mockEmissionCategories = generateRandomEmissionCategories(1000);
