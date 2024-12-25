import { changePasswordSchema, createPasswordSchema } from "@/core/schema";
import { createPasswordFormData, passwordFormData } from "@/helper";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { PasswordField } from "./field";

export type PasswordFormProps = {
	password: string;
	newPassword: string;
	reNewPassword: string;
};

interface ForgotPasswordProps {
	type: "changePassword" | "createPassword";
	onSubmit: (props: PasswordFormProps) => void;
}

export const PasswordForm = ({ onSubmit, type }: ForgotPasswordProps) => {
	// useForm
	const {
		control,
		handleSubmit,

		formState: { isValid, errors },
	} = useForm({
		resolver: yupResolver(type === "createPassword" ? createPasswordSchema : changePasswordSchema),
		mode: "all",
	});

	return (
		<>
			<form className="form-control" onSubmit={handleSubmit(onSubmit)}>
				{(type === "createPassword" ? createPasswordFormData : passwordFormData).map((input) => (
					<div className="relative" key={input.name}>
						<PasswordField
							key={input.name}
							control={control}
							label={input.label}
							id={input.name}
							name={input.name}
						/>
					</div>
				))}

				{type === "changePassword" && (
					<div className="form-item-forgot-pw">
						<Link href="/reset_password">
							<a>Quên mật khẩu</a>
						</Link>
					</div>
				)}

				<button type="submit" className={`btn-primary ${isValid ? "" : "opacity-50"}`}>
					Xác nhận
				</button>
			</form>
		</>
	);
};
