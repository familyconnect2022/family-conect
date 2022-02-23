import {UserAddOutlined} from '@ant-design/icons/lib/icons'
import {Button, Checkbox, DatePicker, Form, Input, Upload, message} from 'antd'
import {useRef, useState} from 'react'
import Logo from '../../components/Logo'
import getBase64 from '../../lib/getBase64'
import {cloudFireStorage, auth} from '../../firebaseClient'
import {
    createUserWithEmailAndPassword,
    updateCurrentUser,
    updateProfile,
} from 'firebase/auth'
import {ref, uploadString} from 'firebase/storage'

export default function CreateAccount() {
    const [imageUrl, setImgUrl] = useState(null)
    const [error, setError] = useState(null)
    const formRegister = useRef()
    const [checkedFId, setCheckedFId] = useState(false)

    const handleOnChangeAvatar = (info) => {
        console.log(info)
        // if (info.file.status === 'done') {
        //     // Get this url from response in real world.
        //     const imageObj = info.file.originFileObj
        //     // getBase64(imageObj, (imageUrl) => {
        //     //     setImgUrl(imageUrl)
        //     // })
        // }
    }

    const handleChangeFamilyId = (value) => {
        setCheckedFId(!checkedFId)
    }
    const resetForm = () => {
        formRegister.current.resetFields()
        setImgUrl(null)
    }

    const handleOnSubmit = async (value) => {
        const {fid} = value
        if (!fid) {
            value.fid = `family-VN-${Date.now()}-${Math.ceil(
                Math.random() * 10000
            )}`
        }
        const valueSubmit = {...value, avatar: imageUrl}
        await createUserWithEmailAndPassword(
            auth,
            valueSubmit.email,
            valueSubmit.password
        )
            .then((userCredential) => {
                setError(null)
                const refAvatarUpload = ref(
                    cloudFireStorage,
                    `avatar/${userCredential.user.email}-${Date.now()}`
                )
                uploadString(refAvatarUpload, valueSubmit.avatar, 'data_url')
                    .then((snapshot) => {
                        const expType =
                            snapshot.metadata.contentType.split('/')[1]
                        const photoURL = `${snapshot.metadata.name}.${expType}`
                        const userCurrent = auth.currentUser
                        updateProfile(userCurrent, {
                            displayName: valueSubmit.displayName,
                            photoURL,
                        })
                            .then((data) => console.log(data))
                            .catch((err) => console.log(err))
                    })
                    .catch((err) => console.log(err))
            })
            .catch((err) => {
                switch (err.code) {
                    case 'auth/email-already-in-use':
                        return setError('Tài khoảng đã tồn tại')
                    case 'auth/weak-password':
                        return setError('Mật khẩu không đảm bảo bảo mật')
                    default:
                        return setError('An unknown error')
                }
            })
        // console.log(valueSubmit)
        // resetForm()
    }
    return (
        <div className='h-full w-full mt-10'>
            <div className='w-[80%] max-w-[600px] px-5 py-8 border m-auto'>
                <Logo />
                <Form
                    ref={(c) => (formRegister.current = c)}
                    className='mt-5 lg:px-6'
                    onFinish={handleOnSubmit}
                    action={`${process.env.NEXT_BASE}/auth/register`}
                    name='register-form'
                    method='POST'
                    wrapperCol={{
                        span: 24,
                    }}
                    labelCol={{
                        span: 10,
                    }}
                >
                    <Form.Item
                        name='avatar'
                        className='
                            text-center mb-2
                            cursor-pointer'
                    >
                        <Upload
                            listType='picture-card'
                            className='avatar-uploader'
                            showUploadList={false}
                            onChange={handleOnChangeAvatar}
                            accept='.png,.jpeg,.jpg'
                            headers={{
                                'Access-Control-Allow-Origin': '*',
                            }}
                        >
                            {imageUrl ? (
                                <div className='w-full h-full rounded-full overflow-hidden p-[2px] bg-red-200'>
                                    <img
                                        className='w-full h-full object-cover rounded-full  '
                                        src={imageUrl}
                                        alt='avatar'
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                        }}
                                    />
                                </div>
                            ) : (
                                <UserAddOutlined />
                            )}
                        </Upload>
                    </Form.Item>
                    <div>
                        <span className='block mb-1 text-gray-700'>
                            * Tên hiển thị
                        </span>
                        <Form.Item
                            name='displayName'
                            className='my-2'
                            rules={[
                                {
                                    required: true,
                                    message: 'Input your display name here',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                    </div>
                    <div>
                        <span className='block mb-1 text-gray-700'>
                            * Email
                        </span>
                        <Form.Item
                            className='my-2'
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
                    </div>
                    <div className='flex gap-3 lg:flex-col lg:gap-1 my-4'>
                        <div>
                            <span className='block mb-1 text-gray-700'>
                                * Password
                            </span>
                            <Form.Item
                                name='password'
                                className='mb-1'
                                rules={[
                                    {
                                        required: true,
                                        message: 'Input your password here',
                                    },
                                ]}
                            >
                                <Input.Password />
                            </Form.Item>
                        </div>
                        <div>
                            <span className='block mb-1 text-gray-700'>
                                * Nhập lại Password
                            </span>
                            <Form.Item
                                name='confirmPassword'
                                className='mb-1'
                                rules={[
                                    {
                                        required: true,
                                        message:
                                            'Please confirm your password!',
                                    },
                                    ({getFieldValue}) => ({
                                        validator(_, value) {
                                            if (
                                                !value ||
                                                getFieldValue('password') ===
                                                    value
                                            ) {
                                                return Promise.resolve()
                                            }

                                            return Promise.reject(
                                                new Error(
                                                    'The two passwords that you entered do not match!'
                                                )
                                            )
                                        },
                                    }),
                                ]}
                            >
                                <Input.Password />
                            </Form.Item>
                        </div>
                    </div>
                    <div className='my-2'>
                        <span className='block mb-1 text-gray-700'>
                            * Sinh nhật
                        </span>
                        <Form.Item
                            name='birthday'
                            className='w-full '
                            rules={[
                                {
                                    required: true,
                                    message: 'Please enter your birthday!',
                                },
                            ]}
                        >
                            <DatePicker
                                format='DD/MM/YYYY'
                                placeholder='Enter Your Birthday'
                                className='w-[100%]'
                            />
                        </Form.Item>
                    </div>

                    {checkedFId ? (
                        <div className='flex my-2'>
                            <div>
                                <span className='block mb-1 text-gray-700'>
                                    * Family ID
                                </span>
                                <Form.Item
                                    name='fid'
                                    rules={[
                                        () => ({
                                            validator(_, value) {
                                                let flag = true
                                                if (!value)
                                                    return Promise.reject(
                                                        new Error(
                                                            'Enter Family ID!'
                                                        )
                                                    )
                                                flag =
                                                    value.includes('family-') &&
                                                    value.includes('-VN-')
                                                flag =
                                                    value.split('-').length ===
                                                    4
                                                if (!flag)
                                                    return Promise.reject(
                                                        new Error(
                                                            'Family ID invaid!'
                                                        )
                                                    )
                                            },
                                        }),
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                            </div>
                            <Button
                                onClick={handleChangeFamilyId}
                                type='text'
                                className='bg-transparent text-blue-600 hover:bg-transparent hover:text-blue-400'
                            >
                                Không có mã F-ID
                            </Button>
                        </div>
                    ) : (
                        <Checkbox
                            checked={checkedFId}
                            onChange={handleChangeFamilyId}
                        >
                            Bạn có F-ID?
                        </Checkbox>
                    )}

                    <div className='my-4'>
                        <span className='block mb-1 text-gray-700'>Mô tả</span>
                        <Form.Item name='description'>
                            <Input.TextArea maxLength={150} showCount />
                        </Form.Item>
                    </div>
                    {error && <div>{error}</div>}
                    <Form.Item className='mb-0 mt-7 w-full'>
                        <Button
                            className='inline-block w-full'
                            htmlType='submit'
                            type='primary'
                        >
                            ĐĂNG KÝ
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}
