import { v4 as uuidv4 } from 'uuid'

const generatePosts = () => {
  const posts = []
  const baseDate = new Date()
  const titles = [
    "Emission Report for Facility A",
    "GHG Inventory Update",
    "Wastewater Treatment Analysis",
    "Energy Consumption Log",
    "Fuel Combustion Data",
    "Monthly Emission Summary",
    "Air Quality Monitoring",
    "Carbon Footprint Assessment",
    "Sustainability Report",
    "Process Optimization Log"
  ]
  const locations = ["Cần Thơ", "Hà Nội", "TP.HCM", "Đà Nẵng", "Vũng Tàu"]

  for (let i = 1; i <= 5000; i++) {
    const projectId = Math.floor(Math.random() * 10) + 1 // 1-10
    const facilityId = Math.floor(Math.random() * 50) + 1 // 1-50
    const createdAt = new Date(baseDate.getTime() - (Math.floor(Math.random() * 3) + i) * 24 * 60 * 60 * 1000)
    const status = Math.floor(Math.random() * 4) // 0-3
    const verifiedAt = status === 3 ? createdAt.toISOString() : ""
    const createdBy = Math.floor(Math.random() * 10) // 0-9

    posts.push({
      id: i,
      gid: uuidv4(),
      created_at: createdAt.toISOString(),
      created_by: createdBy,
      updated_at: createdAt.toISOString(),
      updated_by: createdBy,
      state: Math.floor(Math.random() * 3) - 1, // -1, 0, 1
      version: 0,
      project_id: projectId,
      facility_id: facilityId,
      mod_emission_cat_id: Math.floor(Math.random() * 100) + 1, // 1-100
      title: titles[i % 10],
      content: `Detailed emission data for project ${projectId} at facility ${facilityId}.`,
      emission_date: new Date(createdAt.getTime() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      reporting_period: Math.floor(Math.random() * 12) + 1, // 1-12
      ad: parseFloat((Math.random() * 1000).toFixed(2)), // Activity data
      cod_input: parseFloat((Math.random() * 500).toFixed(2)),
      n_total: parseFloat((Math.random() * 200).toFixed(2)),
      treatment_ratio: parseFloat((Math.random()).toFixed(2)),
      ch4_recovered: parseFloat((Math.random() * 50).toFixed(2)),
      cod_sludge: parseFloat((Math.random() * 100).toFixed(2)),
      lat: parseFloat((Math.random() * 180 - 90).toFixed(6)), // -90 to 90
      lng: parseFloat((Math.random() * 360 - 180).toFixed(6)), // -180 to 180
      location: locations[Math.floor(Math.random() * locations.length)],
      equipment_id: `EQUIP-${i}`,
      data_source: Math.floor(Math.random() * 3), // 0-2
      status: status,
      verified_at: verifiedAt,
      verified_by: status === 3 ? createdBy : 0,
      images: [`/images/post-${i}.jpg`],
      files: [`/files/post-${i}.pdf`],
      equipment_info: {
        type: `Equipment Type ${i}`,
        model: `Model ${i}`,
        capacity: Math.floor(Math.random() * 1000)
      },
      tags: [`emission`, `facility-${facilityId}`, `project-${projectId}`],
      likes: Array(Math.floor(Math.random() * 5)).fill().map((_, idx) => ({
        liked_by: idx + 1,
        liked_at: new Date(createdAt.getTime() - idx * 60 * 1000).toISOString()
      })),
      author: {
        id: createdBy,
        username: `user${createdBy}`,
        full_name: `User ${createdBy}`,
        avatar: `/avatars/user${createdBy}.png`,
        position: `Staff ${createdBy}`,
        department: `Environment Dept`
      }
    })
  }

  return {
    data: posts,
    meta: {
      statusCode: 200,
      message: "OK",
      success: true,
      action: "",
      pagination: {
        start: 0,
        limit: 10,
        total: posts.length,
        page: 1,
        totalPages: 1
      }
    }
  }
}

export const mockPosts = generatePosts()
