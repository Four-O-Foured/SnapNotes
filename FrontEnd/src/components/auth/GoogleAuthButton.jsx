import { GoogleLogin } from '@react-oauth/google';
import { useAuthActions } from '../../hooks/useAuth';
import { showToast } from '../../lib/toast';

const GoogleAuthButton = () => {
    const { googleLogin } = useAuthActions();

    return (
        <div className="w-full mt-4 flex justify-center pb-2">
            <GoogleLogin
                onSuccess={(credentialResponse) => {
                    // Extract the JWT ID token
                    const token = credentialResponse.credential;
                    if (token) {
                        googleLogin.mutate(token);
                    }
                }}
                onError={() => {
                    showToast.error('Google authorization popup was closed or failed.');
                }}
                theme="filled_black"
                size="medium"
                shape="pill"
                width="100%"
                text="continue_with"
            />
        </div>
    );
};

export default GoogleAuthButton;
