import { v4 as uuidv4 } from 'uuid';
import { mockPosts } from './mock-posts.js';

const generateRandomNotifications = (count = 10) => {
  const notifications = [];
  const baseDate = new Date('2025-07-04T16:18:32.913+07:00');
  const types = ['post', 'like', 'comment'];

  for (let i = 1; i <= count; i++) {
    const createdAt = new Date(baseDate.getTime() - i * 12 * 60 * 60 * 1000); // Giảm 12 giờ cho mỗi notification
    const type = types[Math.floor(Math.random() * types.length)];
    const projectId = Math.floor(Math.random() * 10) + 1; // 1 đến 10
    const facilityId = Math.floor(Math.random() * 50) + 1; // 1 đến 10
    const postId = Math.floor(Math.random() * 200) + 1; // 1 đến 10
    const createdBy = Math.floor(Math.random() * 10); // 0 đến 9
    const post = mockPosts.data.find(p => p.id === postId);

    let title, content;
    if (type === 'post') {
      title = post ? post.title : `Generator Fuel Consumption - January 2023 ${i}`;
      content = post ? post.content : "Monthly diesel consumption for backup generator operations";
    } else if (type === 'like') {
      title = `Like on Generator Fuel Consumption ${i}`;
      content = "User liked the post";
    } else {
      title = `Comment on Generator Fuel Consumption ${i}`;
      content = "User commented on the post";
    }

    notifications.push({
      id: i,
      uuid: uuidv4(),
      type: type,
      post_id: postId,
      title: title,
      content: content,
      project_id: projectId,
      facility_id: facilityId,
      created_at: createdAt.toISOString(),
      created_by: createdBy
    });
  }

  return {
    data: notifications,
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

export const mockNotifications = generateRandomNotifications(300);
