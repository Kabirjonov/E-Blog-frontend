// components/forms/fields/PasswordField.tsx
import { useState } from "react";
import type { Control, FieldValues, Path } from "react-hook-form";

import {
	FormField,
	FormItem,
	FormLabel,
	FormControl,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";

interface PasswordFieldProps<T extends FieldValues> {
	control: Control<T>;
	name: Path<T>;
	label: string;
	placeholder?: string;
	disabled?: boolean;
	className?: string;
}

export function PasswordField<T extends FieldValues>({
	control,
	name,
	label,
	placeholder,
	disabled,
	className,
}: PasswordFieldProps<T>) {
	const [show, setShow] = useState(false);

	return (
		<FormField
			control={control}
			name={name}
			render={({ field }) => (
				<FormItem>
					<FormLabel>{label}</FormLabel>
					<FormControl>
						<div className='relative'>
							<Input
								{...field}
								type={show ? "text" : "password"}
								placeholder={placeholder}
								disabled={disabled}
								className={`${className}`}
							/>
							<Button
								type='button'
								variant='ghost'
								size='icon'
								className='absolute right-1 top-1/2 -translate-y-1/2'
								onClick={() => setShow(!show)}
								tabIndex={-1}
							>
								{show ? <EyeOff size={16} /> : <Eye size={16} />}
							</Button>
						</div>
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
}
