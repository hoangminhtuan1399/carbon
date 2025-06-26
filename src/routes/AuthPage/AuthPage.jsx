import { checkAccessToken, saveAccessToken } from "../../utils/access-token.js";
import { Navigate } from "react-router";
import { Button, Card, Form, Input, Tooltip, Typography } from "antd";
import { useTranslation } from "react-i18next";
import { useUserContext } from "../../context/UserContext.jsx";
import AuthApi from "../../../api/auth/AuthApi.js";
import { useCallback, useMemo, useState } from "react";
import { useToast } from "../../hooks/useToast.js";
import { ArrowLeftOutlined } from "@ant-design/icons";

const { Title, Paragraph, Text } = Typography;

export const AuthPage = () => {
  const token = checkAccessToken();
  const { t } = useTranslation();
  const { userMetadata, isFetchingUserMetadata } = useUserContext();
  const { displayMessage } = useToast();
  const [nationalIdForm] = Form.useForm();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState(1);

  const onNationalIdSubmit = useCallback(async (data) => {
    const body = {
      national_id: data.national_id,
      // device_id: userMetadata.deviceId,
      device_id: import.meta.env.VITE_TEST_DEVICE_ID_SUPER_ADMIN,
      language: userMetadata.language
    };
    AuthApi.init(userMetadata);
    try {
      setIsSubmitting(true);
      const response = await AuthApi.checkNationalId(body);
      nationalIdForm.setFieldsValue({
        access_code: response.data.access_code
      });
      setStep(2);
    } catch (e) {
      console.error('National ID validation: ', e);
      displayMessage(t('errors.internal'), 'error');
    } finally {
      setIsSubmitting(false);
    }
  }, [userMetadata]);

  const step1Form = useMemo(() => {
    return (
      <>
        <Paragraph type={'secondary'} className={'text-center'}>{t('login.enter_national_id')}</Paragraph>
        <Form
          form={nationalIdForm}
          disabled={isFetchingUserMetadata || isSubmitting}
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
    );
  }, [isFetchingUserMetadata, isSubmitting, onNationalIdSubmit]);

  const onPasswordSubmit = useCallback(async (data) => {
    const body = {
      national_id: nationalIdForm.getFieldValue('national_id'),
      // device_id: userMetadata.deviceId,
      device_id: import.meta.env.VITE_TEST_DEVICE_ID_SUPER_ADMIN,
      language: userMetadata.language,
      password: data.password,
      access_code: nationalIdForm.getFieldValue('access_code')
    };

    try {
      setIsSubmitting(true);
      AuthApi.init(userMetadata);
      const response = await AuthApi.login(body);
      displayMessage(t(response.meta.message), 'success');
      saveAccessToken(response.data.access_token);
      console.log(response);
    } catch (e) {
      console.error('Login error: ', e);
      displayMessage(t(e.meta.message), 'error');
    } finally {
      setIsSubmitting(false);
    }
  }, [nationalIdForm, userMetadata]);

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
    );
  }, [isFetchingUserMetadata, isSubmitting, onNationalIdSubmit]);

  const handleGoBack = useCallback(() => {
    setStep(1);
    nationalIdForm.resetFields();
  }, [nationalIdForm]);

  const goBackButton = useMemo(() => {
    return (
      <Tooltip title={t('general.back')}>
        <Button className={'absolute top-8 left-6 btn-trans'} variant={'text'} icon={<ArrowLeftOutlined />} onClick={handleGoBack} />
      </Tooltip>
    );
  }, []);

  if (token) return <Navigate to={'/'} replace/>;

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
  );
};
