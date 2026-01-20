// import Image from "next/image";
import SignUpForm from "../components/signup/signup";
// import loginImage from "../assets/images/upscalemedia-transformed (1).png";

const SignUp = () => {
  return (
    <section className="flex items-center max-w-480 satoshi-font">
      <div className="flex justify-center w-full xl:mr-40 mt-8 md:mt-0 p-5">
        <div className="w-100">
          <h1 className="text-3xl md:text-3xl font-semibold mb-2 manrope-font">
            Create Your Account
          </h1>

          <p className="text-[#697586] text-sm md:text-base mb-6">
            Enter your details to start with ROAD HELPER.
          </p>

          <SignUpForm />
        </div>
      </div>
    </section>
  );
};

export default SignUp;
