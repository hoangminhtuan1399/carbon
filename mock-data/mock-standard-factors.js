import { v4 as uuidv4 } from 'uuid'
import { EMISSION_FACTORS } from '../src/constants/libraries.js'

const generateStandardFactors = () => {
  const factors = []
  const activityUnits = ['L', 'ton', 'kWh', 'kg']
  const baseDate = new Date('2025-07-16T04:13:04.131Z')

  // Hàm duyệt cây để lấy các yếu tố có isLeaf: true
  const traverseTree = (node, index = 1) => {
    if (node.isLeaf) {
      const code = node.value
      const activityUnit = activityUnits[Math.floor(Math.random() * activityUnits.length)]
      const co2 = parseFloat((Math.random() * 3).toFixed(2))
      factors.push({
        id: index,
        gid: uuidv4(),
        created_at: baseDate.toISOString(),
        created_by: Math.floor(Math.random() * 10),
        updated_at: baseDate.toISOString(),
        updated_by: Math.floor(Math.random() * 10),
        state: Math.floor(Math.random() * 3) - 1, // -1, 0, 1
        version: 0,
        project_id: 0,
        facility_id: 0,
        emission_cat_id: index,
        std_id: Math.floor(Math.random() * 3) + 1,
        sector_id: Math.floor(Math.random() * 5) + 1,
        code: code,
        scope: Math.floor(Math.random() * 2) + 1, // 1 or 2
        vi_name: node.label,
        vi_description: `Yếu tố phát thải cho ${node.label} ở cấp ${code}`,
        name: node.label,
        description: `Emission factor for ${node.label} in level ${code}`,
        region: "VN",
        formula_type: 0,
        activity_unit: activityUnit,
        co2: co2,
        co2_upper: co2 + parseFloat((Math.random() * 0.5).toFixed(2)),
        co2_lower: Math.max(0, co2 - parseFloat((Math.random() * 0.5).toFixed(2))),
        ch4: parseFloat((Math.random() * 0.1).toFixed(4)),
        ch4_upper: parseFloat((Math.random() * 0.12).toFixed(4)),
        ch4_lower: parseFloat((Math.random() * 0.08).toFixed(4)),
        n2o: parseFloat((Math.random() * 0.01).toFixed(5)),
        n2o_upper: parseFloat((Math.random() * 0.012).toFixed(5)),
        n2o_lower: parseFloat((Math.random() * 0.008).toFixed(5)),
        hfc: parseFloat((Math.random() * 0.05).toFixed(4)),
        hfc_upper: parseFloat((Math.random() * 0.06).toFixed(4)),
        hfc_lower: parseFloat((Math.random() * 0.04).toFixed(4)),
        pfc: parseFloat((Math.random() * 0.05).toFixed(4)),
        pfc_upper: parseFloat((Math.random() * 0.06).toFixed(4)),
        pfc_lower: parseFloat((Math.random() * 0.04).toFixed(4)),
        sf6: parseFloat((Math.random() * 0.01).toFixed(5)),
        sf6_upper: parseFloat((Math.random() * 0.012).toFixed(5)),
        sf6_lower: parseFloat((Math.random() * 0.008).toFixed(5)),
        nf3: parseFloat((Math.random() * 0.01).toFixed(5)),
        nf3_upper: parseFloat((Math.random() * 0.012).toFixed(5)),
        nf3_lower: parseFloat((Math.random() * 0.008).toFixed(5)),
        bo: parseFloat((Math.random() * 2).toFixed(2)),
        bo_upper: parseFloat((Math.random() * 2.5).toFixed(2)),
        bo_lower: parseFloat((Math.random() * 1.5).toFixed(2)),
        nvc: parseFloat((Math.random() * 0.5).toFixed(2)),
        nvc_upper: parseFloat((Math.random() * 0.6).toFixed(2)),
        nvc_lower: parseFloat((Math.random() * 0.4).toFixed(2)),
        mcf: parseFloat((Math.random() * 2).toFixed(2)),
        mcf_upper: parseFloat((Math.random() * 2.5).toFixed(2)),
        mcf_lower: parseFloat((Math.random() * 1.5).toFixed(2)),
        ef_effluent: parseFloat((Math.random() * 0.1).toFixed(4)),
        ef_effluent_upper: parseFloat((Math.random() * 0.12).toFixed(4)),
        ef_effluent_lower: parseFloat((Math.random() * 0.08).toFixed(4)),
        nrem: parseFloat((Math.random() * 2).toFixed(2)),
        nrem_upper: parseFloat((Math.random() * 2.5).toFixed(2)),
        nrem_lower: parseFloat((Math.random() * 1.5).toFixed(2)),
        ef_n2o_plant: parseFloat((Math.random() * 0.01).toFixed(5)),
        ef_n2o_plant_upper: parseFloat((Math.random() * 0.012).toFixed(5)),
        ef_n2o_plant_lower: parseFloat((Math.random() * 0.008).toFixed(5)),
        min_threshold: 0,
        max_threshold: Math.floor(Math.random() * 5000) + 500,
        effective_from: "2020-01-01",
        effective_to: "2030-12-31",
        is_customized: false,
        reason_en: "",
        reason_vi: "",
        approved_by: 0,
        approved_at: "",
        metadata: {}
      })
      return index + 1
    }
    if (node.children) {
      node.children.forEach(child => {
        index = traverseTree(child, index)
      })
    }
    return index
  }

  EMISSION_FACTORS.forEach(node => {
    traverseTree(node)
  })

  return {
    data: factors,
    meta: {
      statusCode: 200,
      message: "OK",
      success: true,
      action: "",
      pagination: {
        start: 0,
        limit: factors.length,
        total: factors.length,
        page: 1,
        totalPages: 1
      }
    }
  }
}

export const mockStandardFactors = generateStandardFactors()
