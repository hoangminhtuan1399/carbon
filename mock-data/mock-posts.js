import { v4 as uuidv4 } from 'uuid';
import { mockProjects } from './mock-projects.js';

const generateRandomPosts = (count = 10) => {
  const posts = [];
  const baseDate = new Date('2025-07-12T16:18:32.913+07:00');
  const adUnits = ['L', 'kWh', 'ton', 'kg'];
  const dataSources = [1, 2, 3];
  const reportingPeriods = [1, 3, 12];

  for (let i = 1; i <= count; i++) {
    const createdAt = new Date(baseDate.getTime() - (Math.floor(Math.random() * 3) + i) * 24 * 60 * 60 * 1000); // Giảm 1 ngày cho mỗi post
    const state = Math.floor(Math.random() * 3) - 1; // -1, 0, hoặc 1
    const projectId = Math.floor(Math.random() * 10) + 1; // 1 đến 10
    const facilityId = Math.floor(Math.random() * 50) + 1; // 1 đến 10
    const emissionCatId = Math.floor(Math.random() * 100) + 1; // 1 đến 10
    const createdBy = Math.floor(Math.random() * 10); // 0 đến 9
    const updatedBy = createdBy;
    const status = Math.floor(Math.random() * 3) + 1; // 1, 2, hoặc 3
    const verifiedAt = status === 3 ? new Date(baseDate.getTime() - (i - 1) * 12 * 60 * 60 * 1000).toISOString() : '';
    const verifiedBy = status === 3 ? Math.floor(Math.random() * 10) + 1 : 0;
    const project = mockProjects.data.find(p => p.id === projectId);
    const emissionDate = project ? project.start_date : '2023-01-31';
    const adUnit = adUnits[Math.floor(Math.random() * adUnits.length)];

    posts.push({
      id: i,
      uuid: uuidv4(),
      created_at: createdAt.toISOString(),
      created_by: createdBy,
      updated_at: createdAt.toISOString(),
      updated_by: updatedBy,
      state: state,
      version: 0,
      project_id: projectId,
      facility_id: facilityId,
      mod_emission_cat_id: emissionCatId,
      title: `Generator Fuel Consumption - ${createdAt.toDateString()}`,
      content: "Monthly diesel consumption for backup generator operations",
      emission_date: emissionDate,
      reporting_period: reportingPeriods[Math.floor(Math.random() * reportingPeriods.length)],
      ad: parseFloat((Math.random() * 5000).toFixed(1)), // 0 đến 5000
      ad_unit: adUnit,
      cod_input: Math.random() > 0.5 ? parseFloat((Math.random() * 100).toFixed(1)) : 0,
      n_total: 0,
      treatment_ratio: Math.random() > 0.5 ? parseFloat((Math.random()).toFixed(2)) : 0,
      ch4_recovered: Math.random() > 0.5 ? parseFloat((Math.random() * 100).toFixed(1)) : 0,
      cod_sludge: Math.random() > 0.5 ? parseFloat((Math.random() * 100).toFixed(1)) : 0,
      lat: parseFloat((Math.random() * (10.5 - 10.0) + 10.0).toFixed(4)), // 10.0 - 10.5
      lng: parseFloat((Math.random() * (105.8 - 105.3) + 105.3).toFixed(4)), // 105.3 - 105.8
      location: "",
      equipment_id: "",
      quality_score: Math.floor(Math.random() * 5) + 1, // 1 đến 5
      uncertainty_pct: Math.floor(Math.random() * 10), // 0 đến 9
      data_source: dataSources[Math.floor(Math.random() * dataSources.length)],
      status: status,
      verified_at: verifiedAt,
      verified_by: verifiedBy,
      images: [],
      files: [],
      equipment_info: {},
      tags: [],
      likes: []
    });
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
        limit: 25,
        total: count,
        page: 1,
        totalPages: 1
      }
    }
  };
};

export const mockPosts = generateRandomPosts(500);
