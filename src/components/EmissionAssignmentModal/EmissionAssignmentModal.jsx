import { Modal, Typography } from "antd"
import { useTranslation } from "react-i18next"

const { Text } = Typography

const EmissionAssignmentModal = ({ visible, onOk, onCancel, user }) => {
  const { t } = useTranslation()

  return (
    <Modal
      title={t('users_page.edit_emission_assignments')}
      open={visible}
      onOk={onOk}
      onCancel={onCancel}
      okButtonProps={{ disabled: true }}
      width={800}
    >
      <Text>{t('users_page.coming_soon')}</Text>
      <Text block className="mt-2">
        {t('users_page.editing_emissions_for', { name: user?.full_name })}
      </Text>
    </Modal>
  )
}

export default EmissionAssignmentModal
