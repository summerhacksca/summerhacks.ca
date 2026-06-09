import Image from "next/image";

import {
	ethnicityOptions,
	genderOptions,
	orange,
	yearOfStudyOptions,
} from "../constants";
import { ApplicationFormData, FieldChangeHandler, SlideId } from "../types";
import { AppComboBox } from "./app-combobox";
import { ApplicationTextField } from "./application-text-field";

type RightPanelContentProps = {
	step: SlideId;
	formData: ApplicationFormData;
	onFieldChange: FieldChangeHandler;
};

export function RightPanelContent({
	step,
	formData,
	onFieldChange,
}: RightPanelContentProps) {
	if (step === 1) {
		return (
			<div className="flex flex-col items-start self-stretch gap-5 overflow-x-hidden">
				<div className="flex flex-col items-start self-stretch gap-5">
					<p className="text-md font-bold text-black">
						Basic Details
					</p>
					<p className="text-sm text-black/60">* are required</p>
					<div className="flex flex-col items-start gap-4 self-stretch">
						<div className="flex items-start gap-4 self-stretch">
							<ApplicationTextField
								placeholder="First Name (Legal)*"
								value={formData.firstNameLegal}
								onChange={(value) =>
									onFieldChange("firstNameLegal", value)
								}
							/>
							<ApplicationTextField
								placeholder="Last Name (Legal)*"
								value={formData.lastNameLegal}
								onChange={(value) =>
									onFieldChange("lastNameLegal", value)
								}
							/>
						</div>
						<div className="flex items-start gap-4 self-stretch">
							<div className="flex-1">
								<ApplicationTextField
									placeholder="Preferred Name"
									value={formData.preferredName}
									onChange={(value) =>
										onFieldChange("preferredName", value)
									}
								/>
							</div>
							<div className="w-32 shrink-0">
								<ApplicationTextField
									placeholder="Age*"
									value={formData.age}
									onChange={(value) =>
										onFieldChange("age", value)
									}
								/>
							</div>
						</div>
						<div className="flex items-start gap-4 self-stretch">
							<AppComboBox
								items={genderOptions}
								placeholder="Gender*"
								value={formData.gender}
								onValueChange={(value) =>
									onFieldChange("gender", value ?? "")
								}
							/>
							<AppComboBox
								items={ethnicityOptions}
								placeholder="Ethnicity*"
								value={formData.ethnicity}
								onValueChange={(value) =>
									onFieldChange("ethnicity", value ?? "")
								}
							/>
						</div>
						<div className="flex items-start gap-4 self-stretch">
							<div className="flex-1">
								<ApplicationTextField
									placeholder="Post Secondary Institution Name*"
									value={formData.institutionName}
									onChange={(value) =>
										onFieldChange("institutionName", value)
									}
								/>
							</div>
							<div className="w-40 shrink-0">
								<AppComboBox
									items={yearOfStudyOptions}
									placeholder="Year*"
									value={formData.yearOfStudy}
									onValueChange={(value) =>
										onFieldChange(
											"yearOfStudy",
											value ?? "",
										)
									}
								/>
							</div>
						</div>
					</div>
				</div>
				<div className="flex flex-col items-start self-stretch gap-5">
					<p className="text-md font-bold text-black">Your Links</p>
					<div className="flex flex-col items-start gap-4 self-stretch">
						<ApplicationTextField
							placeholder="LinkedIn*"
							value={formData.linkedin}
							onChange={(value) =>
								onFieldChange("linkedin", value)
							}
						/>
						<ApplicationTextField
							placeholder="GitHub"
							value={formData.github}
							onChange={(value) => onFieldChange("github", value)}
							required={false}
						/>
						<ApplicationTextField
							placeholder="Resume (link)*"
							value={formData.resumeLink}
							onChange={(value) =>
								onFieldChange("resumeLink", value)
							}
						/>
						<ApplicationTextField
							placeholder="Portfolio (link)"
							value={formData.portfolioLink}
							onChange={(value) =>
								onFieldChange("portfolioLink", value)
							}
							required={false}
						/>
					</div>
				</div>
			</div>
		);
	}

	if (step === 2) {
		return (
			<div className="flex flex-col items-start self-stretch gap-17.5 h-full py-8 overflow-x-hidden">
				<div className="flex flex-col items-start self-stretch gap-4">
					<div className="flex flex-col">
						<p className="text-md font-bold text-black">
							Choose one of the following to answer:*
						</p>
						<ol className="list-decimal pl-5 mt-2 space-y-2 text-md text-black/80">
							<li>
								What is a random topic you could ramble on and
								on about?
							</li>
							<li>
								Tell us about your offline self. Who are you
								outside of the tech and the things you build?
							</li>
						</ol>
					</div>
					<ApplicationTextField
						placeholder="Answer (no word limit!)"
						value={formData.chooseOneAnswer}
						onChange={(value) =>
							onFieldChange("chooseOneAnswer", value)
						}
						multiline
					/>
				</div>
			</div>
		);
	}

	if (step === 3) {
		return (
			<div className="flex flex-col items-center justify-center self-stretch flex-1 w-full min-h-0 overflow-x-hidden">
				<div className="flex flex-col gap-7">
					<div className="flex justify-start items-start gap-7.5">
						<Image
							alt=""
							className="block max-w-none"
							src={orange}
							width={96}
							height={96}
							quality={100}
						/>
						<Image
							alt=""
							className="block max-w-none"
							src={orange}
							width={96}
							height={96}
							quality={100}
						/>
						<Image
							alt=""
							className="block max-w-none"
							src={orange}
							width={96}
							height={96}
							quality={100}
						/>
					</div>
					<p className="text-[#F80] text-3xl font-medium font-['Maison_Neue'] leading-8">
						Build under open skies
					</p>
					<p className="text-text-on-light text-3xl font-normal font-['Maison_Neue'] leading-8">
						Thanks for applying. We are excited to see you at
						SummerHacks!
					</p>
					<div className="flex justify-start items-start gap-7.5">
						<Image
							alt=""
							className="block max-w-none"
							src={orange}
							width={96}
							height={96}
							quality={100}
						/>
						<Image
							alt=""
							className="block max-w-none"
							src={orange}
							width={96}
							height={96}
							quality={100}
						/>
						<Image
							alt=""
							className="block max-w-none"
							src={orange}
							width={96}
							height={96}
							quality={100}
						/>
					</div>
				</div>
			</div>
		);
	}

	return null;
}
