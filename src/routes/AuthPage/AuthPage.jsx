import { checkAccessToken, saveAccessToken } from "../../utils/access-token.js"
import { Navigate } from "react-router"
import { App, Button, Card, Form, Input, Tooltip, Typography } from "antd"
import { useTranslation } from "react-i18next"
import { useUserContext } from "../../context/UserContext.jsx"
import AuthApi from "../../../api/auth/AuthApi.js"
import { useCallback, useMemo, useState } from "react"
import { ArrowLeftOutlined } from "@ant-design/icons"

const { Title, Paragraph, Text } = Typography

export const AuthPage = () => {
  const token = checkAccessToken()
  const { t , i18n} = useTranslation()
  const { updateUserProfile } = useUserContext()
  const { message } = App.useApp()
  const [nationalIdForm] = Form.useForm()

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [step, setStep] = useState(1)

  const onNationalIdSubmit = useCallback(async (data) => {
    const body = {
      national_id: data.national_id,
      language: i18n.language
    }
    try {
      setIsSubmitting(true)

      const response = await AuthApi.checkNationalId(body)
      nationalIdForm.setFieldsValue({
        access_code: response.data.access_code
      })

      setStep(2)
    } catch (e) {
      console.error('National ID validation: ', e)
      message.error(t('errors.internal'))
    } finally {
      setIsSubmitting(false)
    }
  }, [])

  const step1Form = useMemo(() => {
    return (
      <>
        <Paragraph type={'secondary'} className={'text-center'}>{t('login.enter_national_id')}</Paragraph>
        <Form
          form={nationalIdForm}
          disabled={isSubmitting}
          size={'large'}
          onFinish={onNationalIdSubmit}
        >
          <Form.Item
            name={'national_id'}
            rules={[
              {
                required: true,
                message: t('form.required')
              },
              {
                pattern: /^[0-9]{12}$/,
                message: t('form.invalid_national_id_pattern')
              }
            ]}
          >
            <Input placeholder={t('login.national_id_placeholder')}/>
          </Form.Item>
          <Form.Item name={'access_code'} hidden>
            <Input/>
          </Form.Item>
          <Form.Item className={'mt-6 mb-0'}>
            <Button block htmlType={'submit'} type={'primary'}>{t('general.continue')}</Button>
          </Form.Item>
        </Form>
      </>
    )
  }, [isSubmitting, onNationalIdSubmit])

  const onPasswordSubmit = useCallback(async (data) => {
    const body = {
      national_id: nationalIdForm.getFieldValue('national_id'),
      language: i18n.language,
      password: data.password,
      access_code: nationalIdForm.getFieldValue('access_code')
    }

    try {
      setIsSubmitting(true)
      const response = await AuthApi.login(body)

      message.success(t(response.meta.message))
      updateUserProfile(response.data.user)
      saveAccessToken(response.data.access_token)
    } catch (e) {
      message.error(t(e.meta.message))
    } finally {
      setIsSubmitting(false)
    }
  }, [nationalIdForm])

  const step2Form = useMemo(() => {
    return (
      <>
        <Paragraph type={'secondary'} className={'text-center'}>{t('login.enter_password')}</Paragraph>
        <Form
          disabled={isSubmitting}
          size={'large'}
          onFinish={onPasswordSubmit}
        >
          <Form.Item
            name={'password'}
            rules={[
              {
                required: true,
                message: t('form.required')
              },
              {
                pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                message: t('form.invalid_password_pattern')
              }
            ]}
          >
            <Input.Password placeholder={t('login.password_placeholder')}/>
          </Form.Item>
          <Form.Item className={'mt-6 mb-0'}>
            <Button block htmlType={'submit'} type={'primary'}>{t('general.complete')}</Button>
          </Form.Item>
        </Form>
      </>
    )
  }, [isSubmitting, onNationalIdSubmit])

  const handleGoBack = useCallback(() => {
    setStep(1)
    nationalIdForm.resetFields()
  }, [nationalIdForm])

  const goBackButton = useMemo(() => {
    return (
      <Tooltip title={t('actions.back')}>
        <Button
          className={'absolute top-8 left-6 btn-trans'}
          variant={'text'}
          icon={<ArrowLeftOutlined/>}
          onClick={handleGoBack}
        />
      </Tooltip>
    )
  }, [])

  if (token) return <Navigate to={'/'} replace/>

  return (
    <main className={'h-screen w-full bg-(image:--bg-login) bg-cover bg-no-repeat overflow-hidden'}>
      <div className={'page-width flex justify-center items-center'}>
        <Card className={'relative w-100 max-w-full bg-background'}>
          <Title className={'text-center'} level={1}>{t('login.title')}</Title>
          {step === 1 ? step1Form : step2Form}
          {step === 2 ? goBackButton : null}
        </Card>
      </div>
    </main>
  )
}
