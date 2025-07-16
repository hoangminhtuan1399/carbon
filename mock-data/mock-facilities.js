import { v4 as uuidv4 } from 'uuid'

const generateRandomFacilities = (count = 10) => {
  const facilities = [];
  const baseDate = new Date();

  for (let i = 1; i <= count; i++) {
    const createdAt = new Date(baseDate.getTime() - i * 24 * 60 * 60 * 1000); // Giảm 1 ngày cho mỗi facility
    const state = Math.floor(Math.random() * 3) - 1; // -1, 0, hoặc 1
    const projectId = Math.floor(Math.random() * 10) + 1; // 1 đến 10
    const createdBy = Math.floor(Math.random() * 10); // 0 đến 9
    facilities.push({
      id: i,
      uuid: uuidv4(),
      created_at: createdAt.toISOString(),
      created_by: createdBy,
      updated_at: createdAt.toISOString(),
      updated_by: createdBy,
      state: state,
      version: 0,
      project_id: projectId,
      code: `SEAVINA_MAIN_FAC_${i}`,
      name: `SeaVina Main Processing Facility ${i}`,
      description: "Main frozen seafood processing facility including manufacturing plant, office building, and auxiliary areas",
      thumbnail: "",
      lead_id: 0,
      staff_size: 500,
      contact_person: {},
      contact_email: "contact@seavina.com",
      contact_phone: "0939223077",
      address: "Lô 16A-18, KCN Trà Nóc 1, quận Bình Thủy, thành phố Cần Thơ",
      lat: Math.random() * (10.5 - 10.0) + 10.0, // Ngẫu nhiên trong khoảng 10.0 - 10.5
      lng: Math.random() * (105.8 - 105.3) + 105.3, // Ngẫu nhiên trong khoảng 105.3 - 105.8
      capacity: 0,
      capacity_unit: "",
      operational_hours: {},
      certification_info: {},
      metadata: {}
    });
  }

  return {
    data: facilities,
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

export const mockFacilities = generateRandomFacilities(50);
