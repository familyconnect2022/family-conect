import {Button, Checkbox, Form, Input} from 'antd'
import {auth} from '../../firebaseClient'
import {
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
} from 'firebase/auth'
import {Fragment, useEffect, useState} from 'react'

export default function LoginPage() {
    const [user, setUser] = useState(null)

    useEffect(() => {
        const unwrapOnAuthStateChange = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user.email)
            } else {
                setUser(user)
            }
        })
        return () => unwrapOnAuthStateChange()
    }, [])
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
        <Fragment>
            <div>User current: {user}</div>
            <div className='h-full w-full flex justify-center items-center'>
                <div className='w-[70%] max-w-[400px] px-5 py-10 border rounded-md shadow-md bg-white'>
                    <Form
                        method='POST'
                        onFinish={handleOnSubmit}
                        name='login-form'
                        wrapperCol={{
                            span: 24,
                        }}
                        labelCol={{
                            span: 6,
                        }}
                        initialValues={{
                            remember: true,
                        }}
                    >
                        <h3 className='text-center mb-8 uppercase font-semibold text-lg'>
                            Login!!!
                        </h3>
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
                        <Form.Item
                            name='remember'
                            valuePropName='checked'
                            wrapperCol={{span: 24, offset: 5}}
                        >
                            <Checkbox>Remember me</Checkbox>
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

                        <Form.Item className='mb-0 w-full'>
                            <Button
                                className='inline-block w-full bg-green-600 mt-5 text-white'
                                onClick={async () => await signOut(auth)}
                            >
                                Sign out
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </Fragment>
    )
}
