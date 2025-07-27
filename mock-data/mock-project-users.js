import { v4 as uuidv4 } from 'uuid'
import { mockProjects } from './mock-projects.js'

const generateRandomUsers = (projectId, count = 105) => {
  const users = []
  const baseDate = new Date('2025-07-23T23:10:00+07:00')
  const project = mockProjects.data.find(p => p.id === projectId) || mockProjects.data[0]
  const orgId = project ? project.org_id : 1

  const levelDistribution = [
    { level: 100, count: 1, role: 'SUPER_ADMIN' },
    { level: 90, count: 1, role: 'ADMIN' },
    { level: 80, count: 1, role: 'VERIFIER' },
    { level: 70, count: 1, role: 'OBSERVER' },
    { level: 60, count: 1, role: 'PROJECT_MANAGER' },
    { level: 50, count: 10, role: 'LEADER' },
    { level: 40, count: 90, role: 'STAFF' }
  ]

  let userId = (projectId - 1) * 105 + 1
  for (const { level, count: levelCount, role } of levelDistribution) {
    for (let i = 0; i < levelCount; i++) {
      const createdAt = new Date(baseDate.getTime() - userId * 24 * 60 * 60 * 1000)
      const state = Math.floor(Math.random() * 3) - 1
      const createdBy = Math.floor(Math.random() * 10)
      const teamId = level <= 60 ? null : Math.floor(Math.random() * 10) + 1
      const username = `user_${role.toLowerCase()}_${userId}`
      const fullName = `${role} User ${userId}`
      const nationalId = `1234567890${String(userId % 100).padStart(2, '0')}`
      const email = `${username}@tinchicarbon.com`
      const phone = `+84${Math.floor(100000000 + Math.random() * 900000000)}`

      users.push({
        id: userId,
        gid: uuidv4(),
        created_at: createdAt.toISOString(),
        created_by: createdBy,
        updated_at: createdAt.toISOString(),
        updated_by: createdBy,
        state: state,
        version: 0,
        username: username,
        full_name: fullName,
        national_id: nationalId,
        date_of_birth: `199${Math.floor(Math.random() * 10)}-0${Math.floor(Math.random() * 9) + 1}-01`,
        avatar: '',
        id_card: '',
        email: email,
        phone: phone,
        address: project.address || '123 Đường Láng, Đống Đa, Hà Nội',
        org_id: orgId,
        role_id: Math.floor(Math.random() * 5) + 1,
        level: level,
        parent_id: level <= 60 ? null : Math.floor(Math.random() * 10) + 1,
        project_id: projectId,
        team_id: teamId,
        position: role.replace('_', ' '),
        department: level <= 60 ? 'Management' : 'Operations',
        approved_by: 0,
        approved_at: '',
        device_id: uuidv4(),
        settings: {
          theme: Math.random() > 0.5 ? 'light' : 'dark',
          timezone: 'Asia/Ho_Chi_Minh'
        }
      })
      userId++
    }
  }

  return {
    data: users,
    meta: {
      status_code: 200,
      message: 'OK',
      success: true,
      action: '',
      pagination: {
        start: 0,
        limit: count,
        total: users.length,
        page: 1,
        totalPages: 1
      }
    }
  }
}

export const mockProjectUsers = Array.from({ length: 10 }, (_, i) => generateRandomUsers(i + 1)).flatMap(response => response.data)
