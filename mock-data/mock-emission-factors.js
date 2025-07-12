import { v4 as uuidv4 } from 'uuid'
import { mockProjects } from './mock-projects.js'
import { mockStandardFactors } from './mock-standard-factors.js'

const generateEmissionFactors = (count = 1000) => {
  const emissionFactors = []
  const baseDate = new Date('2025-07-05T18:56:34.011Z')
  const standardFactors = mockStandardFactors.data

  for (let i = 1; i <= count; i++) {
    const createdAt = new Date(baseDate.getTime() - i * 24 * 60 * 60 * 1000)
    const state = Math.floor(Math.random() * 3) - 1 // -1, 0, 1
    const projectId = Math.floor(Math.random() * 10) + 1 // 1-10
    const facilityId = Math.floor(Math.random() * 50) + 1 // 1-50
    const createdBy = Math.floor(Math.random() * 10) // 0-9
    const updatedBy = createdBy
    const project = mockProjects.data.find(p => p.id === projectId)
    const sectorId = project ? project.sector_id : 1
    const effectiveFrom = project ? project.start_date : '2023-01-01'
    const effectiveTo = project ? project.end_date : '2023-12-31'

    // Chọn ngẫu nhiên một standard factor
    const standardFactor = standardFactors[Math.floor(Math.random() * standardFactors.length)]

    emissionFactors.push({
      id: i,
      uuid: uuidv4(),
      created_at: createdAt.toISOString(),
      created_by: createdBy,
      updated_at: createdAt.toISOString(),
      updated_by: updatedBy,
      state: state,
      version: 0,
      std_id: Math.floor(Math.random() * 3) + 1, // 1-3
      sector_id: sectorId,
      project_id: projectId,
      facility_id: facilityId,
      code: standardFactor.code,
      scope: standardFactor.scope,
      vi_name: standardFactor.vi_name,
      vi_description: standardFactor.vi_description,
      name: standardFactor.name,
      description: standardFactor.description,
      region: "VN",
      fuel_type: standardFactor.fuel_type,
      combustion_type: standardFactor.combustion_type,
      technology_type: standardFactor.technology_type,
      formula_type: 0,
      activity_unit: standardFactor.activity_unit,
      emission_unit: "KG_CO2E",
      calc_method: "Emission Factor",
      formula: standardFactor.formula,
      co2: standardFactor.co2,
      ch4: standardFactor.ch4,
      n2o: standardFactor.n2o,
      is_mandatory: standardFactor.is_mandatory,
      min_threshold: standardFactor.min_threshold,
      max_threshold: standardFactor.max_threshold,
      source: "IPCC 2006",
      effective_from: effectiveFrom,
      effective_to: effectiveTo,
      uncertainty_pct: standardFactor.uncertainty_pct,
      ref_doc: standardFactor.ref_doc,
      expert_notes: standardFactor.expert_notes,
      calculation_example: standardFactor.calculation_example,
      tags: standardFactor.tags,
      metadata: {}
    })
  }

  return {
    data: emissionFactors,
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
        totalPages: Math.ceil(count / 25)
      }
    }
  }
}

export const mockEmissionFactors = generateEmissionFactors(1000)
