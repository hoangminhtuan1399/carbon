import { v4 as uuidv4 } from 'uuid'
import { mockProjects } from './mock-projects.js'
import { mockStandardFactors } from './mock-standard-factors.js'

const generateEmissionFactors = (count = 1000) => {
  const emissionFactors = []
  const baseDate = new Date('2025-07-16T04:13:04.131Z')
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
      gid: uuidv4(),
      created_at: createdAt.toISOString(),
      created_by: createdBy,
      updated_at: createdAt.toISOString(),
      updated_by: updatedBy,
      state: state,
      version: 0,
      project_id: projectId,
      facility_id: facilityId,
      emission_cat_id: standardFactor.id,
      std_id: Math.floor(Math.random() * 3) + 1,
      sector_id: sectorId,
      code: standardFactor.code,
      scope: standardFactor.scope,
      vi_name: standardFactor.vi_name,
      vi_description: standardFactor.vi_description,
      name: standardFactor.name,
      description: standardFactor.description,
      region: "VN",
      formula_type: 0,
      activity_unit: standardFactor.activity_unit,
      co2: standardFactor.co2,
      co2_upper: standardFactor.co2_upper,
      co2_lower: standardFactor.co2_lower,
      ch4: standardFactor.ch4,
      ch4_upper: standardFactor.ch4_upper,
      ch4_lower: standardFactor.ch4_lower,
      n2o: standardFactor.n2o,
      n2o_upper: standardFactor.n2o_upper,
      n2o_lower: standardFactor.n2o_lower,
      hfc: standardFactor.hfc,
      hfc_upper: standardFactor.hfc_upper,
      hfc_lower: standardFactor.hfc_lower,
      pfc: standardFactor.pfc,
      pfc_upper: standardFactor.pfc_upper,
      pfc_lower: standardFactor.pfc_lower,
      sf6: standardFactor.sf6,
      sf6_upper: standardFactor.sf6_upper,
      sf6_lower: standardFactor.sf6_lower,
      nf3: standardFactor.nf3,
      nf3_upper: standardFactor.nf3_upper,
      nf3_lower: standardFactor.nf3_lower,
      bo: standardFactor.bo,
      bo_upper: standardFactor.bo_upper,
      bo_lower: standardFactor.bo_lower,
      nvc: standardFactor.nvc,
      nvc_upper: standardFactor.nvc_upper,
      nvc_lower: standardFactor.nvc_lower,
      mcf: standardFactor.mcf,
      mcf_upper: standardFactor.mcf_upper,
      mcf_lower: standardFactor.mcf_lower,
      ef_effluent: standardFactor.ef_effluent,
      ef_effluent_upper: standardFactor.ef_effluent_upper,
      ef_effluent_lower: standardFactor.ef_effluent_lower,
      nrem: standardFactor.nrem,
      nrem_upper: standardFactor.nrem_upper,
      nrem_lower: standardFactor.nrem_lower,
      ef_n2o_plant: standardFactor.ef_n2o_plant,
      ef_n2o_plant_upper: standardFactor.ef_n2o_plant_upper,
      ef_n2o_plant_lower: standardFactor.ef_n2o_plant_lower,
      min_threshold: standardFactor.min_threshold,
      max_threshold: standardFactor.max_threshold,
      effective_from: effectiveFrom,
      effective_to: effectiveTo,
      is_customized: false,
      reason_en: "",
      reason_vi: "",
      approved_by: 0,
      approved_at: "",
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
