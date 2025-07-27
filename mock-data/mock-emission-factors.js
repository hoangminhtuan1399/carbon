import { v4 as uuidv4 } from 'uuid'
import { mockProjects } from './mock-projects.js'
import { mockStandardFactors } from './mock-standard-factors.js'

const generateEmissionFactors = (count = 1000) => {
  const emissionFactors = []
  const baseDate = new Date('2025-07-23T23:10:00+07:00')
  const standardFactors = mockStandardFactors.data
  const indicators = [
    'co2', 'ch4', 'n2o', 'hfc', 'pfc', 'sf6', 'nf3',
    'bo', 'nvc', 'mcf', 'ef_effluent', 'nrem', 'ef_n2o_plant'
  ]

  for (let i = 1; i <= count; i++) {
    const createdAt = new Date(baseDate.getTime() - i * 24 * 60 * 60 * 1000)
    const state = Math.floor(Math.random() * 3) - 1
    const projectId = Math.floor(Math.random() * 10) + 1
    const facilityId = Math.floor(Math.random() * 50) + 1
    const formulaType = Math.floor(Math.random() * 4) + 1
    const createdBy = Math.floor(Math.random() * 10)
    const updatedBy = createdBy
    const project = mockProjects.data.find(p => p.id === projectId)
    const sectorId = project ? project.sector_id : 1
    const effectiveFrom = project ? project.start_date : '2023-01-01'
    const effectiveTo = project ? project.end_date : '2023-12-31'

    const standardFactor = standardFactors[Math.floor(Math.random() * standardFactors.length)]

    const nullIndicators = indicators
      .sort(() => Math.random() - 0.5)
      .slice(0, Math.floor(indicators.length / 2))

    const factor = {
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
      formula_type: formulaType,
      activity_unit: standardFactor.activity_unit,
      co2: nullIndicators.includes('co2') ? null : standardFactor.co2,
      co2_upper: nullIndicators.includes('co2') ? null : standardFactor.co2_upper,
      co2_lower: nullIndicators.includes('co2') ? null : standardFactor.co2_lower,
      ch4: nullIndicators.includes('ch4') ? null : standardFactor.ch4,
      ch4_upper: nullIndicators.includes('ch4') ? null : standardFactor.ch4_upper,
      ch4_lower: nullIndicators.includes('ch4') ? null : standardFactor.ch4_lower,
      n2o: nullIndicators.includes('n2o') ? null : standardFactor.n2o,
      n2o_upper: nullIndicators.includes('n2o') ? null : standardFactor.n2o_upper,
      n2o_lower: nullIndicators.includes('n2o') ? null : standardFactor.n2o_lower,
      hfc: nullIndicators.includes('hfc') ? null : standardFactor.hfc,
      hfc_upper: nullIndicators.includes('hfc') ? null : standardFactor.hfc_upper,
      hfc_lower: nullIndicators.includes('hfc') ? null : standardFactor.hfc_lower,
      pfc: nullIndicators.includes('pfc') ? null : standardFactor.pfc,
      pfc_upper: nullIndicators.includes('pfc') ? null : standardFactor.pfc_upper,
      pfc_lower: nullIndicators.includes('pfc') ? null : standardFactor.pfc_lower,
      sf6: nullIndicators.includes('sf6') ? null : standardFactor.sf6,
      sf6_upper: nullIndicators.includes('sf6') ? null : standardFactor.sf6_upper,
      sf6_lower: nullIndicators.includes('sf6') ? null : standardFactor.sf6_lower,
      nf3: nullIndicators.includes('nf3') ? null : standardFactor.nf3,
      nf3_upper: nullIndicators.includes('nf3') ? null : standardFactor.nf3_upper,
      nf3_lower: nullIndicators.includes('nf3') ? null : standardFactor.nf3_lower,
      bo: nullIndicators.includes('bo') ? null : standardFactor.bo,
      bo_upper: nullIndicators.includes('bo') ? null : standardFactor.bo_upper,
      bo_lower: nullIndicators.includes('bo') ? null : standardFactor.bo_lower,
      nvc: nullIndicators.includes('nvc') ? null : standardFactor.nvc,
      nvc_upper: nullIndicators.includes('nvc') ? null : standardFactor.nvc_upper,
      nvc_lower: nullIndicators.includes('nvc') ? null : standardFactor.nvc_lower,
      mcf: nullIndicators.includes('mcf') ? null : standardFactor.mcf,
      mcf_upper: nullIndicators.includes('mcf') ? null : standardFactor.mcf_upper,
      mcf_lower: nullIndicators.includes('mcf') ? null : standardFactor.mcf_lower,
      ef_effluent: nullIndicators.includes('ef_effluent') ? null : standardFactor.ef_effluent,
      ef_effluent_upper: nullIndicators.includes('ef_effluent') ? null : standardFactor.ef_effluent_upper,
      ef_effluent_lower: nullIndicators.includes('ef_effluent') ? null : standardFactor.ef_effluent_lower,
      nrem: nullIndicators.includes('nrem') ? null : standardFactor.nrem,
      nrem_upper: nullIndicators.includes('nrem') ? null : standardFactor.nrem_upper,
      nrem_lower: nullIndicators.includes('nrem') ? null : standardFactor.nrem_lower,
      ef_n2o_plant: nullIndicators.includes('ef_n2o_plant') ? null : standardFactor.ef_n2o_plant,
      ef_n2o_plant_upper: nullIndicators.includes('ef_n2o_plant') ? null : standardFactor.ef_n2o_plant_upper,
      ef_n2o_plant_lower: nullIndicators.includes('ef_n2o_plant') ? null : standardFactor.ef_n2o_plant_lower,
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
    }

    emissionFactors.push(factor)
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
