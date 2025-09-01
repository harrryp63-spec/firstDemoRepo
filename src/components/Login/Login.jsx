import * as React from 'react';
import { useState, useEffect } from 'react';
import './Login.css'
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useDispatch, useSelector } from "react-redux";
import { loginStart, loginSuccess, loginFailure } from "../../redux/features/auth/authReducer";
import { useNavigate } from "react-router-dom";

import LockIcon from '@mui/icons-material/Lock';
import FingerprintIcon from '@mui/icons-material/Fingerprint';
import BadgeIcon from '@mui/icons-material/Badge';
import PersonIcon from '@mui/icons-material/Person';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';

import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

import Box from '@mui/material/Box';

const validationSchema = Yup.object({
  password: Yup.string()
    .required('Password is required')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{16,}$/,
      'Must be 16+ characters and include uppercase, lowercase, number, and special character.'
    ),
  username: Yup.string()
    .required('Username is required')
});

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error } = useSelector((state) => state.auth);

  const [activeMethod, setActiveMethod] = useState('password-otp');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [verificationType, setVerificationType] = useState("otp"); // default OTP
  const [verificationValue, setVerificationValue] = useState("");

  const [alignment, setAlignment] = React.useState('left');


  const formik = useFormik({
    initialValues: {
      username: '',
      password: ''
    },
    validationSchema,
    onSubmit: (values) => {
      dispatch(loginStart());
      try {
        // Simulate API call
        const user = { id: 1, email: "test@example.com" };
        dispatch(loginSuccess(user));
        navigate("/dashboard");
      } catch (err) {
        dispatch(loginFailure("Invalid credentials"));
      }
    },
  });


  // Handle authentication method change
  const handleMethodChange = (method) => {
    setActiveMethod(method);
  };

  const handleAlignment = (event, newAlignment) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment);
    }
  };

  const renderVerificationField = () => {
    switch (verificationType) {
      case "otp":
        return (
          <Box className="form-group">
            <label> <PhoneIphoneIcon fontSize='small' className='phone-icon' /> VERIFICATION CODE</label>
            <TextField
              fullWidth
              type="text"
              id="verification-code"
              placeholder="Enter your military ID"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
              variant="outlined"
              size="small"
              sx={{ paddingBottom: 3 }}
            />
          </Box>
        );

      case "biometrics":
        return (
          <Box className="form-group">
            <label style={{ textAlign: 'center' }} >BIOMERTIC VERIFICATION REQUIRED</label>
            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', paddingBottom: 1 }}>
              <Box className="biometric-btn">
                <Box className="biometric-icon">
                  <FingerprintIcon fontSize='medium' />
                </Box>
              </Box>
              <Box className="password-requirements">
                Use registered fingerprint or facial recognition
              </Box>
            </Box>

          </Box>
        );

      // case "smartcard":
      //   return (
      //     <Box className="form-group">
      //       <label style={{ textAlign: 'center' }}>SMART CARD AUTHENTICATION</label>
      //       <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingBottom: 2 }}>
      //         <BadgeIcon fontSize='large' />
      //       </Box>
      //     </Box>
      //   )
    }
  }


  return (
    <Box className='container'>
      <Box className='login-container'>
        <Box className='login-header'>
          <Typography variant='h1' component='h1'>PERSONNEL INFORMATION SYSTEM</Typography>
        </Box>

        <Box className="login-body">


          <Box component="form" onSubmit={formik.handleSubmit} noValidate
          // className={`auth-form ${activeMethod === 'password-otp' ? 'active' : ''}`}
          >
            <Box className="form-group">
              <label> <PersonIcon fontSize='small' /> USER ID</label>
              <TextField
                fullWidth
                type="text"
                id="username"
                placeholder="Enter your User ID"
                value={formik.values.username}
                // onChange={(e) => setUsername(e.target.value)}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.username && Boolean(formik.errors.username)}
                helperText={formik.touched.username && formik.errors.username}
                required
                variant="outlined"
                size="small"
              />
            </Box>

            <Box className="form-group">
              <label> <LockIcon fontSize='small' /> PASSWORD</label>
              <TextField
                fullWidth
                type="password"
                id="password"
                placeholder="16+ character minimum"
                value={formik.values.password}
                // onChange={(e) => setPassword(e.target.value)}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
                required
                variant="outlined"
                size="small"
              />
            </Box>



            <Box className="password-requirements">
              Minimum 16 characters with uppercase, lowercase, numbers, and special characters
            </Box>

            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                paddingTop: 1,
                paddingBottom: 1
              }}
            >
              

              <Stack direction="row" width="100%" spacing={4}>
                <ToggleButtonGroup
                  value={verificationType}
                  exclusive
                  onChange={(e) => setVerificationType(e.target.value)}
                  aria-label="text alignment"
                  size='small'
                  sx={{ height: '30px' }}
                  
                >
                  <ToggleButton value="otp" aria-label="left aligned">
                    OTP
                  </ToggleButton>
                  <ToggleButton value="biometrics" aria-label="centered">
                    BIO-METRICS
                  </ToggleButton>
                  {/* <ToggleButton value="smartcard" aria-label="right aligned">
                    SMART CARD
                  </ToggleButton> */}
                </ToggleButtonGroup>

              </Stack>
            </Box>
            {renderVerificationField()}

            <Button sx={{ color: 'white' }} type="submit" fullWidth className="btn-login">
              LOGIN
            </Button>
          </Box>

        </Box>

        <Box className="login-footer">
          CLASSIFIED SYSTEM - UNAUTHORIZED ACCESS PROHIBITED BY MILITARY LAW
        </Box>
      </Box>
    </Box>
  );
}
