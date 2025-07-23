// Hàm kiểm tra xem một node có con isLeaf: true không
const hasLeafNode = (node) => {
  if (node.isLeaf) return true
  if (node.children) {
    return node.children.some(child => hasLeafNode(child))
  }
  return false
}

// Hàm thêm disabled: true cho các node không có con isLeaf: true
const addDisabledToNonLeafBranches = (nodes) => {
  return nodes.map(node => {
    const newNode = { ...node }
    if (!hasLeafNode(newNode)) {
      newNode.disabled = true
    } else if (newNode.children) {
      newNode.children = addDisabledToNonLeafBranches(newNode.children)
    }
    return newNode
  })
}

export const EMISSION_FACTORS = addDisabledToNonLeafBranches([
  {
    value: '1',
    label: 'Máy phát điện',
    children: [
      {
        value: '1.01',
        label: 'Đốt nhiên liệu',
        children: [
          {
            value: '1.01.1',
            label: 'Đốt cố định',
            children: [
              { value: '1.01.1.1', label: 'Công nghiệp năng lượng', disabled: true },
              {
                value: '1.01.1.2',
                label: 'Công nghiệp sản xuất và xây dựng',
                children: [
                  { value: '1.01.1.2.01', label: 'Crude Oil', isLeaf: true },
                  { value: '1.01.1.2.02', label: 'Orimulsion', isLeaf: true },
                  { value: '1.01.1.2.03', label: 'Natural Gas Liquids', isLeaf: true },
                  { value: '1.01.1.2.04', label: 'Motor Gasoline', isLeaf: true },
                  { value: '1.01.1.2.05', label: 'Aviation Gasoline', isLeaf: true },
                  { value: '1.01.1.2.06', label: 'Jet Gasoline', isLeaf: true },
                  { value: '1.01.1.2.07', label: 'Jet Kerosene', isLeaf: true },
                  { value: '1.01.1.2.08', label: 'Other Kerosene', isLeaf: true },
                  { value: '1.01.1.2.09', label: 'Shale Oil', isLeaf: true },
                  { value: '1.01.1.2.10', label: 'Gas/Diesel Oil', isLeaf: true },
                  { value: '1.01.1.2.11', label: 'Residual Fuel Oil', isLeaf: true },
                  { value: '1.01.1.2.12', label: 'Liquefied Petroleum Gases', isLeaf: true },
                  { value: '1.01.1.2.13', label: 'Ethane', isLeaf: true },
                  { value: '1.01.1.2.14', label: 'Naphtha', isLeaf: true },
                  { value: '1.01.1.2.15', label: 'Bitumen', isLeaf: true },
                  { value: '1.01.1.2.16', label: 'Lubricants', isLeaf: true },
                  { value: '1.01.1.2.17', label: 'Petroleum Coke', isLeaf: true },
                  { value: '1.01.1.2.18', label: 'Refinery Feedstocks', isLeaf: true },
                  { value: '1.01.1.2.19', label: 'Refinery Gas', isLeaf: true },
                  { value: '1.01.1.2.20', label: 'Paraffin Waxes', isLeaf: true },
                  { value: '1.01.1.2.21', label: 'White Spirit and SBP', isLeaf: true },
                  { value: '1.01.1.2.22', label: 'Other Petroleum Products', isLeaf: true },
                  { value: '1.01.1.2.23', label: 'Anthracite', isLeaf: true },
                  { value: '1.01.1.2.24', label: 'Coking Coal', isLeaf: true },
                  { value: '1.01.1.2.25', label: 'Other Bituminous Coal', isLeaf: true },
                  { value: '1.01.1.2.26', label: 'Sub-Bituminous Coal', isLeaf: true },
                  { value: '1.01.1.2.27', label: 'Lignite', isLeaf: true },
                  { value: '1.01.1.2.28', label: 'Oil Shale and Tar Sands', isLeaf: true },
                  { value: '1.01.1.2.29', label: 'Brown Coal Briquettes', isLeaf: true },
                  { value: '1.01.1.2.30', label: 'Patent Fuel', isLeaf: true },
                  { value: '1.01.1.2.31', label: 'Coke Oven Coke and Lignite Coke', isLeaf: true },
                  { value: '1.01.1.2.32', label: 'Gas Coke', isLeaf: true },
                  { value: '1.01.1.2.33', label: 'Coal Tar', isLeaf: true },
                  { value: '1.01.1.2.34', label: 'Gas Works Gas', isLeaf: true },
                  { value: '1.01.1.2.35', label: 'Coke Oven Gas', isLeaf: true },
                  { value: '1.01.1.2.36', label: 'Blast Furnace Gas', isLeaf: true },
                  { value: '1.01.1.2.37', label: 'Oxygen Steel Furnace Gas', isLeaf: true },
                  { value: '1.01.1.2.38', label: 'Natural Gas', isLeaf: true },
                  { value: '1.01.1.2.39', label: 'Municipal Wastes (non-biomass fraction)', isLeaf: true },
                  { value: '1.01.1.2.40', label: 'Industrial Wastes', isLeaf: true },
                  { value: '1.01.1.2.41', label: 'Waste Oils', isLeaf: true },
                  { value: '1.01.1.2.42', label: 'Peat', isLeaf: true },
                  { value: '1.01.1.2.43', label: 'Wood / Wood Waste', isLeaf: true },
                  { value: '1.01.1.2.44', label: 'Sulphite lyes (Black Liquor)a', isLeaf: true },
                  { value: '1.01.1.2.45', label: 'Other Primary Solid Biomass', isLeaf: true },
                  { value: '1.01.1.2.46', label: 'Charcoal', isLeaf: true },
                  { value: '1.01.1.2.47', label: 'Biogasoline', isLeaf: true },
                  { value: '1.01.1.2.48', label: 'Biodiesels', isLeaf: true },
                  { value: '1.01.1.2.49', label: 'Other Liquid Biofuels', isLeaf: true },
                  { value: '1.01.1.2.50', label: 'Landfill Gas', isLeaf: true },
                  { value: '1.01.1.2.51', label: 'Sludge Gas', isLeaf: true },
                  { value: '1.01.1.2.52', label: 'Other Biogas', isLeaf: true },
                  { value: '1.01.1.2.53', label: 'Municipal Wastes (biomass fraction)', isLeaf: true }
                ]
              },
              { value: '1.01.1.3', label: 'Tòa nhà Thương mại / Trụ sở làm việc', disabled: true },
              { value: '1.01.1.4', label: 'Dân cư và lĩnh vực nông nghiệp, rừng, lâm nghiệp và nuôi trồng thủy sản', disabled: true }
            ]
          },
          { value: '1.01.2', label: 'Đốt di động', disabled: true }
        ]
      },
      { value: '1.02', label: 'Phát thải rò rỉ từ khai thác nguyên liệu', disabled: true },
      { value: '1.03', label: 'Vận chuyển và lưu trữ CO2', disabled: true },
      { value: '1.04', label: 'Công nghiệp khai khoáng', disabled: true },
      { value: '1.05', label: 'Công nghiệp kim loại', disabled: true },
      { value: '1.06', label: 'Công nghiệp hóa chất', disabled: true },
      { value: '1.07', label: 'Công nghiệp điện tử', disabled: true },
      { value: '1.08', label: 'Sử dụng dung môi và các sản phẩm phi năng lượng từ nhiên liệu', disabled: true },
      { value: '1.09', label: 'Sử dụng sản phẩm thay thế cho các chất suy giảm tầng ozone', disabled: true },
      { value: '1.10', label: 'Sản xuất và sử dụng các sản phẩm khác', disabled: true },
      { value: '1.11', label: 'Chăn nuôi', disabled: true },
      { value: '1.12', label: 'Sử dụng đất', disabled: true },
      { value: '1.13', label: 'Chôn lấp chất thải rắn', disabled: true },
      { value: '1.14', label: 'Xử lý sinh học chất thải rắn', disabled: true },
      { value: '1.15', label: 'Đốt lò và đốt lộ thiên chất thải rắn', disabled: true },
      { value: '1.16', label: 'Thải bỏ và xử lý nước thải', disabled: true }
    ]
  },
  {
    value: '2',
    label: 'Bơm chữa cháy',
    children: [
      {
        value: '2.01',
        label: 'Đốt nhiên liệu',
        children: [
          {
            value: '2.01.1',
            label: 'Đốt cố định',
            children: [
              { value: '2.01.1.1', label: 'Công nghiệp năng lượng', disabled: true },
              {
                value: '2.01.1.2',
                label: 'Công nghiệp sản xuất và xây dựng',
                children: [
                  { value: '2.01.1.2.01', label: 'Crude Oil', isLeaf: true },
                  { value: '2.01.1.2.02', label: 'Orimulsion', isLeaf: true },
                  { value: '2.01.1.2.03', label: 'Natural Gas Liquids', isLeaf: true },
                  { value: '2.01.1.2.04', label: 'Motor Gasoline', isLeaf: true },
                  { value: '2.01.1.2.05', label: 'Aviation Gasoline', isLeaf: true },
                  { value: '2.01.1.2.06', label: 'Jet Gasoline', isLeaf: true },
                  { value: '2.01.1.2.07', label: 'Jet Kerosene', isLeaf: true },
                  { value: '2.01.1.2.08', label: 'Other Kerosene', isLeaf: true },
                  { value: '2.01.1.2.09', label: 'Shale Oil', isLeaf: true },
                  { value: '2.01.1.2.10', label: 'Gas/Diesel Oil', isLeaf: true },
                  { value: '2.01.1.2.11', label: 'Residual Fuel Oil', isLeaf: true },
                  { value: '2.01.1.2.12', label: 'Liquefied Petroleum Gases', isLeaf: true },
                  { value: '2.01.1.2.13', label: 'Ethane', isLeaf: true },
                  { value: '2.01.1.2.14', label: 'Naphtha', isLeaf: true },
                  { value: '2.01.1.2.15', label: 'Bitumen', isLeaf: true },
                  { value: '2.01.1.2.16', label: 'Lubricants', isLeaf: true },
                  { value: '2.01.1.2.17', label: 'Petroleum Coke', isLeaf: true },
                  { value: '2.01.1.2.18', label: 'Refinery Feedstocks', isLeaf: true },
                  { value: '2.01.1.2.19', label: 'Refinery Gas', isLeaf: true },
                  { value: '2.01.1.2.20', label: 'Paraffin Waxes', isLeaf: true },
                  { value: '2.01.1.2.21', label: 'White Spirit and SBP', isLeaf: true },
                  { value: '2.01.1.2.22', label: 'Other Petroleum Products', isLeaf: true },
                  { value: '2.01.1.2.23', label: 'Anthracite', isLeaf: true },
                  { value: '2.01.1.2.24', label: 'Coking Coal', isLeaf: true },
                  { value: '2.01.1.2.25', label: 'Other Bituminous Coal', isLeaf: true },
                  { value: '2.01.1.2.26', label: 'Sub-Bituminous Coal', isLeaf: true },
                  { value: '2.01.1.2.27', label: 'Lignite', isLeaf: true },
                  { value: '2.01.1.2.28', label: 'Oil Shale and Tar Sands', isLeaf: true },
                  { value: '2.01.1.2.29', label: 'Brown Coal Briquettes', isLeaf: true },
                  { value: '2.01.1.2.30', label: 'Patent Fuel', isLeaf: true },
                  { value: '2.01.1.2.31', label: 'Coke Oven Coke and Lignite Coke', isLeaf: true },
                  { value: '2.01.1.2.32', label: 'Gas Coke', isLeaf: true },
                  { value: '2.01.1.2.33', label: 'Coal Tar', isLeaf: true },
                  { value: '2.01.1.2.34', label: 'Gas Works Gas', isLeaf: true },
                  { value: '2.01.1.2.35', label: 'Coke Oven Gas', isLeaf: true },
                  { value: '2.01.1.2.36', label: 'Blast Furnace Gas', isLeaf: true },
                  { value: '2.01.1.2.37', label: 'Oxygen Steel Furnace Gas', isLeaf: true },
                  { value: '2.01.1.2.38', label: 'Natural Gas', isLeaf: true },
                  { value: '2.01.1.2.39', label: 'Municipal Wastes (non-biomass fraction)', isLeaf: true },
                  { value: '2.01.1.2.40', label: 'Industrial Wastes', isLeaf: true },
                  { value: '2.01.1.2.41', label: 'Waste Oils', isLeaf: true },
                  { value: '2.01.1.2.42', label: 'Peat', isLeaf: true },
                  { value: '2.01.1.2.43', label: 'Wood / Wood Waste', isLeaf: true },
                  { value: '2.01.1.2.44', label: 'Sulphite lyes (Black Liquor)a', isLeaf: true },
                  { value: '2.01.1.2.45', label: 'Other Primary Solid Biomass', isLeaf: true },
                  { value: '2.01.1.2.46', label: 'Charcoal', isLeaf: true },
                  { value: '2.01.1.2.47', label: 'Biogasoline', isLeaf: true },
                  { value: '2.01.1.2.48', label: 'Biodiesels', isLeaf: true },
                  { value: '2.01.1.2.49', label: 'Other Liquid Biofuels', isLeaf: true },
                  { value: '2.01.1.2.50', label: 'Landfill Gas', isLeaf: true },
                  { value: '2.01.1.2.51', label: 'Sludge Gas', isLeaf: true },
                  { value: '2.01.1.2.52', label: 'Other Biogas', isLeaf: true },
                  { value: '2.01.1.2.53', label: 'Municipal Wastes (biomass fraction)', isLeaf: true }
                ]
              },
              { value: '2.01.1.3', label: 'Tòa nhà Thương mại / Trụ sở làm việc', disabled: true },
              { value: '2.01.1.4', label: 'Dân cư và lĩnh vực nông nghiệp, rừng, lâm nghiệp và nuôi trồng thủy sản', disabled: true }
            ]
          },
          { value: '2.01.2', label: 'Đốt di động', disabled: true }
        ]
      },
      { value: '2.02', label: 'Phát thải rò rỉ từ khai thác nguyên liệu', disabled: true },
      { value: '2.03', label: 'Vận chuyển và lưu trữ CO2', disabled: true },
      { value: '2.04', label: 'Công nghiệp khai khoáng', disabled: true },
      { value: '2.05', label: 'Công nghiệp kim loại', disabled: true },
      { value: '2.06', label: 'Công nghiệp hóa chất', disabled: true },
      { value: '2.07', label: 'Công nghiệp điện tử', disabled: true },
      { value: '2.08', label: 'Sử dụng dung môi và các sản phẩm phi năng lượng từ nhiên liệu', disabled: true },
      { value: '2.09', label: 'Sử dụng sản phẩm thay thế cho các chất suy giảm tầng ozone', disabled: true },
      { value: '2.10', label: 'Sản xuất và sử dụng các sản phẩm khác', disabled: true },
      { value: '2.11', label: 'Chăn nuôi', disabled: true },
      { value: '2.12', label: 'Sử dụng đất', disabled: true },
      { value: '2.13', label: 'Chôn lấp chất thải rắn', disabled: true },
      { value: '2.14', label: 'Xử lý sinh học chất thải rắn', disabled: true },
      { value: '2.15', label: 'Đốt lò và đốt lộ thiên chất thải rắn', disabled: true },
      { value: '2.16', label: 'Thải bỏ và xử lý nước thải', disabled: true }
    ]
  },
  {
    value: '3',
    label: 'Nấu ăn',
    children: [
      {
        value: '3.01',
        label: 'Đốt nhiên liệu',
        children: [
          {
            value: '3.01.1',
            label: 'Đốt cố định',
            children: [
              { value: '3.01.1.1', label: 'Công nghiệp năng lượng', disabled: true },
              {
                value: '3.01.1.2',
                label: 'Công nghiệp sản xuất và xây dựng',
                children: [
                  { value: '3.01.1.2.01', label: 'Crude Oil', isLeaf: true },
                  { value: '3.01.1.2.02', label: 'Orimulsion', isLeaf: true },
                  { value: '3.01.1.2.03', label: 'Natural Gas Liquids', isLeaf: true },
                  { value: '3.01.1.2.04', label: 'Motor Gasoline', isLeaf: true },
                  { value: '3.01.1.2.05', label: 'Aviation Gasoline', isLeaf: true },
                  { value: '3.01.1.2.06', label: 'Jet Gasoline', isLeaf: true },
                  { value: '3.01.1.2.07', label: 'Jet Kerosene', isLeaf: true },
                  { value: '3.01.1.2.08', label: 'Other Kerosene', isLeaf: true },
                  { value: '3.01.1.2.09', label: 'Shale Oil', isLeaf: true },
                  { value: '3.01.1.2.10', label: 'Gas/Diesel Oil', isLeaf: true },
                  { value: '3.01.1.2.11', label: 'Residual Fuel Oil', isLeaf: true },
                  { value: '3.01.1.2.12', label: 'Liquefied Petroleum Gases', isLeaf: true },
                  { value: '3.01.1.2.13', label: 'Ethane', isLeaf: true },
                  { value: '3.01.1.2.14', label: 'Naphtha', isLeaf: true },
                  { value: '3.01.1.2.15', label: 'Bitumen', isLeaf: true },
                  { value: '3.01.1.2.16', label: 'Lubricants', isLeaf: true },
                  { value: '3.01.1.2.17', label: 'Petroleum Coke', isLeaf: true },
                  { value: '3.01.1.2.18', label: 'Refinery Feedstocks', isLeaf: true },
                  { value: '3.01.1.2.19', label: 'Refinery Gas', isLeaf: true },
                  { value: '3.01.1.2.20', label: 'Paraffin Waxes', isLeaf: true },
                  { value: '3.01.1.2.21', label: 'White Spirit and SBP', isLeaf: true },
                  { value: '3.01.1.2.22', label: 'Other Petroleum Products', isLeaf: true },
                  { value: '3.01.1.2.23', label: 'Anthracite', isLeaf: true },
                  { value: '3.01.1.2.24', label: 'Coking Coal', isLeaf: true },
                  { value: '3.01.1.2.25', label: 'Other Bituminous Coal', isLeaf: true },
                  { value: '3.01.1.2.26', label: 'Sub-Bituminous Coal', isLeaf: true },
                  { value: '3.01.1.2.27', label: 'Lignite', isLeaf: true },
                  { value: '3.01.1.2.28', label: 'Oil Shale and Tar Sands', isLeaf: true },
                  { value: '3.01.1.2.29', label: 'Brown Coal Briquettes', isLeaf: true },
                  { value: '3.01.1.2.30', label: 'Patent Fuel', isLeaf: true },
                  { value: '3.01.1.2.31', label: 'Coke Oven Coke and Lignite Coke', isLeaf: true },
                  { value: '3.01.1.2.32', label: 'Gas Coke', isLeaf: true },
                  { value: '3.01.1.2.33', label: 'Coal Tar', isLeaf: true },
                  { value: '3.01.1.2.34', label: 'Gas Works Gas', isLeaf: true },
                  { value: '3.01.1.2.35', label: 'Coke Oven Gas', isLeaf: true },
                  { value: '3.01.1.2.36', label: 'Blast Furnace Gas', isLeaf: true },
                  { value: '3.01.1.2.37', label: 'Oxygen Steel Furnace Gas', isLeaf: true },
                  { value: '3.01.1.2.38', label: 'Natural Gas', isLeaf: true },
                  { value: '3.01.1.2.39', label: 'Municipal Wastes (non-biomass fraction)', isLeaf: true },
                  { value: '3.01.1.2.40', label: 'Industrial Wastes', isLeaf: true },
                  { value: '3.01.1.2.41', label: 'Waste Oils', isLeaf: true },
                  { value: '3.01.1.2.42', label: 'Peat', isLeaf: true },
                  { value: '3.01.1.2.43', label: 'Wood / Wood Waste', isLeaf: true },
                  { value: '3.01.1.2.44', label: 'Sulphite lyes (Black Liquor)a', isLeaf: true },
                  { value: '3.01.1.2.45', label: 'Other Primary Solid Biomass', isLeaf: true },
                  { value: '3.01.1.2.46', label: 'Charcoal', isLeaf: true },
                  { value: '3.01.1.2.47', label: 'Biogasoline', isLeaf: true },
                  { value: '3.01.1.2.48', label: 'Biodiesels', isLeaf: true },
                  { value: '3.01.1.2.49', label: 'Other Liquid Biofuels', isLeaf: true },
                  { value: '3.01.1.2.50', label: 'Landfill Gas', isLeaf: true },
                  { value: '3.01.1.2.51', label: 'Sludge Gas', isLeaf: true },
                  { value: '3.01.1.2.52', label: 'Other Biogas', isLeaf: true },
                  { value: '3.01.1.2.53', label: 'Municipal Wastes (biomass fraction)', isLeaf: true }
                ]
              },
              {
                value: '3.01.1.4',
                label: 'Dân cư và lĩnh vực nông nghiệp, rừng, lâm nghiệp và nuôi trồng thủy sản',
                children: [
                  { value: '3.01.1.4.01', label: 'Crude Oil', isLeaf: true },
                  { value: '3.01.1.4.02', label: 'Orimulsion', isLeaf: true },
                  { value: '3.01.1.4.03', label: 'Natural Gas Liquids', isLeaf: true },
                  { value: '3.01.1.4.04', label: 'Motor Gasoline', isLeaf: true },
                  { value: '3.01.1.4.05', label: 'Aviation Gasoline', isLeaf: true },
                  { value: '3.01.1.4.06', label: 'Jet Gasoline', isLeaf: true },
                  { value: '3.01.1.4.07', label: 'Jet Kerosene', isLeaf: true },
                  { value: '3.01.1.4.08', label: 'Other Kerosene', isLeaf: true },
                  { value: '3.01.1.4.09', label: 'Shale Oil', isLeaf: true },
                  { value: '3.01.1.4.10', label: 'Gas/Diesel Oil', isLeaf: true },
                  { value: '3.01.1.4.11', label: 'Residual Fuel Oil', isLeaf: true },
                  { value: '3.01.1.4.12', label: 'Liquefied Petroleum Gases', isLeaf: true },
                  { value: '3.01.1.4.13', label: 'Ethane', isLeaf: true },
                  { value: '3.01.1.4.14', label: 'Naphtha', isLeaf: true },
                  { value: '3.01.1.4.15', label: 'Bitumen', isLeaf: true },
                  { value: '3.01.1.4.16', label: 'Lubricants', isLeaf: true },
                  { value: '3.01.1.4.17', label: 'Petroleum Coke', isLeaf: true },
                  { value: '3.01.1.4.18', label: 'Refinery Feedstocks', isLeaf: true },
                  { value: '3.01.1.4.19', label: 'Refinery Gas', isLeaf: true },
                  { value: '3.01.1.4.20', label: 'Paraffin Waxes', isLeaf: true },
                  { value: '3.01.1.4.21', label: 'White Spirit and SBP', isLeaf: true },
                  { value: '3.01.1.4.22', label: 'Other Petroleum Products', isLeaf: true },
                  { value: '3.01.1.4.23', label: 'Anthracite', isLeaf: true },
                  { value: '3.01.1.4.24', label: 'Coking Coal', isLeaf: true },
                  { value: '3.01.1.4.25', label: 'Other Bituminous Coal', isLeaf: true },
                  { value: '3.01.1.4.26', label: 'Sub-Bituminous Coal', isLeaf: true },
                  { value: '3.01.1.4.27', label: 'Lignite', isLeaf: true },
                  { value: '3.01.1.4.28', label: 'Oil Shale and Tar Sands', isLeaf: true },
                  { value: '3.01.1.4.29', label: 'Brown Coal Briquettes', isLeaf: true },
                  { value: '3.01.1.4.30', label: 'Patent Fuel', isLeaf: true },
                  { value: '3.01.1.4.31', label: 'Coke Oven Coke and Lignite Coke', isLeaf: true },
                  { value: '3.01.1.4.32', label: 'Gas Coke', isLeaf: true },
                  { value: '3.01.1.4.33', label: 'Coal Tar', isLeaf: true },
                  { value: '3.01.1.4.34', label: 'Gas Works Gas', isLeaf: true },
                  { value: '3.01.1.4.35', label: 'Coke Oven Gas', isLeaf: true },
                  { value: '3.01.1.4.36', label: 'Blast Furnace Gas', isLeaf: true },
                  { value: '3.01.1.4.37', label: 'Oxygen Steel Furnace Gas', isLeaf: true },
                  { value: '3.01.1.4.38', label: 'Natural Gas', isLeaf: true },
                  { value: '3.01.1.4.39', label: 'Municipal Wastes (non-biomass fraction)', isLeaf: true },
                  { value: '3.01.1.4.40', label: 'Industrial Wastes', isLeaf: true },
                  { value: '3.01.1.4.41', label: 'Waste Oils', isLeaf: true },
                  { value: '3.01.1.4.42', label: 'Peat', isLeaf: true },
                  { value: '3.01.1.4.43', label: 'Wood / Wood Waste', isLeaf: true },
                  { value: '3.01.1.4.44', label: 'Sulphite lyes (Black Liquor)a', isLeaf: true },
                  { value: '3.01.1.4.45', label: 'Other Primary Solid Biomass', isLeaf: true },
                  { value: '3.01.1.4.46', label: 'Charcoal', isLeaf: true },
                  { value: '3.01.1.4.47', label: 'Biogasoline', isLeaf: true },
                  { value: '3.01.1.4.48', label: 'Biodiesels', isLeaf: true },
                  { value: '3.01.1.4.49', label: 'Other Liquid Biofuels', isLeaf: true },
                  { value: '3.01.1.4.50', label: 'Landfill Gas', isLeaf: true },
                  { value: '3.01.1.4.51', label: 'Sludge Gas', isLeaf: true },
                  { value: '3.01.1.4.52', label: 'Other Biogas', isLeaf: true },
                  { value: '3.01.1.4.53', label: 'Municipal Wastes (biomass fraction)', isLeaf: true }
                ]
              }
            ]
          },
          { value: '3.01.2', label: 'Đốt di động', disabled: true }
        ]
      },
      { value: '3.02', label: 'Phát thải rò rỉ từ khai thác nguyên liệu', disabled: true },
      { value: '3.03', label: 'Vận chuyển và lưu trữ CO2', disabled: true },
      { value: '3.04', label: 'Công nghiệp khai khoáng', disabled: true },
      { value: '3.05', label: 'Công nghiệp kim loại', disabled: true },
      { value: '3.06', label: 'Công nghiệp hóa chất', disabled: true },
      { value: '3.07', label: 'Công nghiệp điện tử', disabled: true },
      { value: '3.08', label: 'Sử dụng dung môi và các sản phẩm phi năng lượng từ nhiên liệu', disabled: true },
      { value: '3.09', label: 'Sử dụng sản phẩm thay thế cho các chất suy giảm tầng ozone', disabled: true },
      { value: '3.10', label: 'Sản xuất và sử dụng các sản phẩm khác', disabled: true },
      { value: '3.11', label: 'Chăn nuôi', disabled: true },
      { value: '3.12', label: 'Sử dụng đất', disabled: true },
      { value: '3.13', label: 'Chôn lấp chất thải rắn', disabled: true },
      { value: '3.14', label: 'Xử lý sinh học chất thải rắn', disabled: true },
      { value: '3.15', label: 'Đốt lò và đốt lộ thiên chất thải rắn', disabled: true },
      { value: '3.16', label: 'Thải bỏ và xử lý nước thải', disabled: true }
    ]
  },
  {
    value: '4',
    label: 'Di chuyển của phương tiện',
    children: [
      {
        value: '4.01',
        label: 'Đốt nhiên liệu',
        children: [
          { value: '4.01.1', label: 'Đốt cố định', disabled: true },
          {
            value: '4.01.2',
            label: 'Đốt di động',
            children: [
              {
                value: '4.01.2.1',
                label: 'On road',
                children: [
                  { value: '4.01.2.1.01', label: 'Motor Gasoline - car uncontrolled', isLeaf: true },
                  { value: '4.01.2.1.02', label: 'Motor Gasoline - car Oxidation Catalyst', isLeaf: true },
                  { value: '4.01.2.1.03', label: 'Motor Gasoline - car vintage 1995 or later', isLeaf: true },
                  { value: '4.01.2.1.04', label: 'Gas/Diesel Oil', isLeaf: true },
                  { value: '4.01.2.1.05', label: 'Liquefied Petroleum Gases', isLeaf: true },
                  { value: '4.01.2.1.06', label: 'Kerosene', isLeaf: true },
                  { value: '4.01.2.1.07', label: 'Lubricants', isLeaf: true },
                  { value: '4.01.2.1.08', label: 'Compressed Natural Gas', isLeaf: true },
                  { value: '4.01.2.1.09', label: 'Liquefied Natural Gas', isLeaf: true },
                  { value: '4.01.2.1.10', label: 'Ethanol - truck USA', isLeaf: true },
                  { value: '4.01.2.1.11', label: 'Ethanol - car, Brazil', isLeaf: true }
                ]
              },
              { value: '4.01.2.2', label: 'Off road', disabled: true },
              { value: '4.01.2.3', label: 'Đường hàng không', disabled: true },
              { value: '4.01.2.4', label: 'Đường sắt', disabled: true },
              { value: '4.01.2.5', label: 'Đường thủy', disabled: true }
            ]
          }
        ]
      },
      { value: '4.02', label: 'Phát thải rò rỉ từ khai thác nguyên liệu', disabled: true },
      { value: '4.03', label: 'Vận chuyển và lưu trữ CO2', disabled: true },
      { value: '4.04', label: 'Công nghiệp khai khoáng', disabled: true },
      { value: '4.05', label: 'Công nghiệp kim loại', disabled: true },
      { value: '4.06', label: 'Công nghiệp hóa chất', disabled: true },
      { value: '4.07', label: 'Công nghiệp điện tử', disabled: true },
      { value: '4.08', label: 'Sử dụng dung môi và các sản phẩm phi năng lượng từ nhiên liệu', disabled: true },
      { value: '4.09', label: 'Sử dụng sản phẩm thay thế cho các chất suy giảm tầng ozone', disabled: true },
      { value: '4.10', label: 'Sản xuất và sử dụng các sản phẩm khác', disabled: true },
      { value: '4.11', label: 'Chăn nuôi', disabled: true },
      { value: '4.12', label: 'Sử dụng đất', disabled: true },
      { value: '4.13', label: 'Chôn lấp chất thải rắn', disabled: true },
      { value: '4.14', label: 'Xử lý sinh học chất thải rắn', disabled: true },
      { value: '4.15', label: 'Đốt lò và đốt lộ thiên chất thải rắn', disabled: true },
      { value: '4.16', label: 'Thải bỏ và xử lý nước thải', disabled: true }
    ]
  },
  {
    value: '5',
    label: 'Điều hòa, tủ đông',
    disabled: true,
    children: []
  },
  {
    value: '6',
    label: 'Lò nung',
    disabled: true,
    children: []
  },
  {
    value: '7',
    label: 'Nước thải',
    children: [
      { value: '7.01', label: 'Đốt nhiên liệu', disabled: true },
      { value: '7.02', label: 'Phát thải rò rỉ từ khai thác nguyên liệu', disabled: true },
      { value: '7.03', label: 'Vận chuyển và lưu trữ CO2', disabled: true },
      { value: '7.04', label: 'Công nghiệp khai khoáng', disabled: true },
      { value: '7.05', label: 'Công nghiệp kim loại', disabled: true },
      { value: '7.06', label: 'Công nghiệp hóa chất', disabled: true },
      { value: '7.07', label: 'Công nghiệp điện tử', disabled: true },
      { value: '7.08', label: 'Sử dụng dung môi và các sản phẩm phi năng lượng từ nhiên liệu', disabled: true },
      { value: '7.09', label: 'Sử dụng sản phẩm thay thế cho các chất suy giảm tầng ozone', disabled: true },
      { value: '7.10', label: 'Sản xuất và sử dụng các sản phẩm khác', disabled: true },
      { value: '7.11', label: 'Chăn nuôi', disabled: true },
      { value: '7.12', label: 'Sử dụng đất', disabled: true },
      { value: '7.13', label: 'Chôn lấp chất thải rắn', disabled: true },
      { value: '7.14', label: 'Xử lý sinh học chất thải rắn', disabled: true },
      { value: '7.15', label: 'Đốt lò và đốt lộ thiên chất thải rắn', disabled: true },
      {
        value: '7.16',
        label: 'Thải bỏ và xử lý nước thải',
        children: [
          { value: '7.16.1', label: 'Nước thải Sinh hoạt', disabled: true },
          {
            value: '7.16.2',
            label: 'Nước thải công nghiệp',
            children: [
              {
                value: '7.16.2.1',
                label: 'Công nghệ xử lý',
                children: [
                  { value: '7.16.2.1.1', label: 'Xử lý hiếu khí tập trung', isLeaf: true },
                  { value: '7.16.2.1.2', label: 'Bể phản ứng yếm khí', isLeaf: true },
                  { value: '7.16.2.1.3', label: 'Hồ yếm khí nông (<2m) và hồ tùy nghi', isLeaf: true },
                  { value: '7.16.2.1.4', label: 'Hồ yếm khí sâu (>2m)', isLeaf: true },
                  { value: '7.16.2.1.5', label: 'Đất ngập nước nhân tạo - Dòng chảy bề mặt (SF)', isLeaf: true },
                  { value: '7.16.2.1.6', label: 'Đất ngập nước nhân tạo - Dòng chảy ngầm theo chiều ngang (HSSF)', isLeaf: true },
                  { value: '7.16.2.1.7', label: 'Đất ngập nước nhân tạo - Dòng chảy ngầm chiều dọc (VSSF)', isLeaf: true }
                ]
              },
              {
                value: '7.16.2.2',
                label: 'Loại xử lí (Nrem)',
                children: [
                  { value: '7.16.2.2.1', label: 'Không xử lí', isLeaf: true },
                  { value: '7.16.2.2.2', label: 'Xử lý sơ cấp cơ học', isLeaf: true },
                  { value: '7.16.2.2.3', label: 'Xử lý thứ cấp sinh học', isLeaf: true },
                  { value: '7.16.2.2.4', label: 'Xử lý sinh học nâng cao', isLeaf: true },
                  { value: '7.16.2.2.5', label: 'Bể phốt', isLeaf: true },
                  { value: '7.16.2.2.6', label: 'Bể phốt + xả thải qua đất', isLeaf: true },
                  { value: '7.16.2.2.7', label: 'Nhà vệ sinh', isLeaf: true }
                ]
              },
              {
                value: '7.16.2.3',
                label: 'TV Phương thức thải bỏ',
                children: [
                  { value: '7.16.2.3.1', label: 'Thải bỏ ra môi trường nước ngọt, cửa sông, biển', isLeaf: true },
                  { value: '7.16.2.3.2', label: 'Môi trường nước ngọt, cửa sông và biển bị phù dưỡng và/hoặc thiếu oxy', isLeaf: true },
                  { value: '7.16.2.3.3', label: 'Thải ra đất', isLeaf: true }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  {
    value: '8',
    label: 'Mua điện',
    disabled: true,
    children: []
  },
  {
    value: '9',
    label: 'Mua hơi',
    disabled: true,
    children: []
  },
  {
    value: '10',
    label: 'Đi công tác của nhân viên',
    disabled: true,
    children: []
  },
  {
    value: '11',
    label: 'Đi lại hàng ngày của nhân viên',
    disabled: true,
    children: []
  }
])
