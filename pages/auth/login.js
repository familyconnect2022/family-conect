import {Button, Form, Input} from 'antd'
import {signInWithEmailAndPassword} from 'firebase/auth'
import Logo from '../../components/Logo'
import {auth} from '../../firebaseClient'

export default function LoginPage() {
    const handleOnSubmit = async (value) => {
        const {email, password} = value
        if (email && password) {
            await signInWithEmailAndPassword(auth, email, password)
                .then((userCreditial) => {
                    console.log(userCreditial)
                })
                .catch((err) => console.log(err))
        }
    }

    return (
        <div className='h-full w-full flex justify-center items-center'>
            <div className='w-[70%] max-w-[400px] px-5 py-8 border rounded-md shadow-md bg-white'>
                <Logo />
                <Form
                    className='mt-5'
                    method='POST'
                    onFinish={handleOnSubmit}
                    name='login-form'
                    wrapperCol={{
                        span: 24,
                    }}
                    labelCol={{
                        span: 6,
                    }}
                >
                    <Form.Item
                        className='mb-3'
                        label='Email'
                        name='email'
                        rules={[
                            {
                                required: true,
                                type: 'email',
                                message: 'Input your email here',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label='Password'
                        name='password'
                        rules={[
                            {
                                required: true,
                                message: 'Input your password here',
                            },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item className='mb-5 w-full -mt-4 text-center italic'>
                        <Button type='link' href='/auth/register'>
                            <span className='underline'>
                                Bạn chưa có tài khoảng?
                            </span>
                        </Button>
                    </Form.Item>
                    <Form.Item className='mb-0 w-full'>
                        <Button
                            className='inline-block w-full'
                            htmlType='submit'
                            type='primary'
                        >
                            ĐĂNG NHẬP
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}
