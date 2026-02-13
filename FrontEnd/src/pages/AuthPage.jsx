import { useState } from 'react';
import AuthHeader from '../components/auth/AuthHeader';
import LoginForm from '../components/auth/LoginForm';
import RegisterForm from '../components/auth/RegisterForm';
import { BackgroundLines } from '../components/ui/BackgroundLines';

const AuthPage = () => {
    const [isLogin, setIsLogin] = useState(true);

    return (
        <div className="min-h-screen bg-snap-bg-main flex items-center justify-center p-6 relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {/* Central Glow behind the form */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40%] h-[40%] bg-snap-cyan/20 rounded-full blur-[120px] animate-pulse-glow delay-500" />
            </div>

            <BackgroundLines className="flex items-center w-full h-full justify-center">
                <div className="max-w-md w-full relative z-10 transition-all duration-500">
                    <div className="glass-card-glow p-8 md:p-12 relative overflow-hidden">
                        <AuthHeader
                            title={isLogin ? "Welcome Back" : "Create Account"}
                            subtitle={isLogin ? "Please enter your details to sign in" : "Get started with your free account today"}
                        />

                        <div className="relative">
                            {isLogin ? (
                                <LoginForm onToggle={() => setIsLogin(false)} />
                            ) : (
                                <RegisterForm onToggle={() => setIsLogin(true)} />
                            )}
                        </div>
                    </div>
                </div>
            </BackgroundLines>


        </div>
    );
};

export default AuthPage;
