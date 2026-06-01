import Image from "next/image";

import { orange, tshirtSizeOptions, yesNoOptions } from "../constants";
import { ApplicationFormData, FieldChangeHandler, SlideId } from "../types";
import { AppComboBox } from "./app-combobox";
import { ApplicationTextField } from "./application-text-field";

type LeftPanelContentProps = {
	step: SlideId;
	formData: ApplicationFormData;
	onFieldChange: FieldChangeHandler;
};

export function LeftPanelContent({
	step,
	formData,
	onFieldChange,
}: LeftPanelContentProps) {
	if (step === 1) {
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
						Join us under the sun.
					</p>
					<p className="text-text-on-light text-3xl font-normal font-['Maison_Neue'] leading-8">
						Creating a hacker profile is the first step to
						experience SummerHacks.
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

	if (step === 2) {
		return (
			<div className="flex flex-col items-start self-stretch gap-17.5 h-full py-17.5 overflow-x-hidden">
				<div className="flex flex-col items-start self-stretch gap-4">
					<div className="flex flex-col">
						<p className="text-md font-bold text-black">
							Tell us about a project you are proud of!*
						</p>
						<p>
							While it does not have to specifically be technical,
							please include your role in the project, challenges
							you faced, and lessons you learned.
						</p>
					</div>
					<ApplicationTextField
						placeholder="Answer (500 words)"
						value={formData.proudProject}
						onChange={(value) =>
							onFieldChange("proudProject", value)
						}
						multiline
					/>
				</div>
				<div className="flex flex-col items-start self-stretch gap-4">
					<div className="flex flex-col">
						<p className="text-md font-bold text-black">
							Choose one of the following to answer:*
						</p>
						<ol type="1">
							<li>
								1. What is an issue you come across in your day
								to day life, and how would you solve it?
							</li>
							<li>
								2. How would you define &quot;creativity&quot; in the
								present day with tools like generative AI? Do
								you think AI diminishes the value of human art,
								or does it enable more people to express
								themselves freely?
							</li>
						</ol>
					</div>
					<ApplicationTextField
						placeholder="Answer (500 words)"
						value={formData.chooseOneAnswer}
						onChange={(value) =>
							onFieldChange("chooseOneAnswer", value)
						}
						multiline
					/>
				</div>
				<div className="flex flex-col items-start self-stretch gap-4">
					<div className="flex flex-col">
						<p className="text-md font-bold text-black">
							What do you hope to get out of SummerHacks?*
						</p>
					</div>
					<ApplicationTextField
						placeholder="Answer (150 words)"
						value={formData.summerHacksGoal}
						onChange={(value) =>
							onFieldChange("summerHacksGoal", value)
						}
						multiline
						maxWords={150}
					/>
				</div>
			</div>
		);
	}

	if (step === 3) {
		return (
			<div className="flex flex-col items-start self-stretch gap-16 h-full py-17.5 overflow-x-hidden">
				<div className="flex flex-col items-start self-stretch gap-4">
					<div className="flex flex-col">
						<p className="text-md font-bold text-black">
							Any dietary restrictions and/or allergies?*
						</p>
					</div>
					<ApplicationTextField
						placeholder="N/A if none"
						value={formData.dietaryRestrictions}
						onChange={(value) =>
							onFieldChange("dietaryRestrictions", value)
						}
					/>
				</div>
				<div className="flex flex-col items-start self-stretch gap-4">
					<div className="flex flex-col">
						<p className="text-md font-bold text-black">
							Do you require any accessibility accommodations to
							fully enjoy the event?*
						</p>
					</div>
					<ApplicationTextField
						placeholder="Answer"
						value={formData.accessibilityNeeds}
						onChange={(value) =>
							onFieldChange("accessibilityNeeds", value)
						}
					/>
				</div>
				<div className="flex flex-col items-start self-stretch gap-4">
					<div className="flex flex-col">
						<p className="text-md font-bold text-black">
							What is your t-shirt size?*
						</p>
					</div>
					<div className="flex w-full">
						<AppComboBox
							items={tshirtSizeOptions}
							placeholder="Select a t-shirt size"
							value={formData.tshirtSize}
							onValueChange={(value) =>
								onFieldChange("tshirtSize", value ?? "")
							}
						/>
					</div>
				</div>
				<div className="flex flex-col items-start self-stretch gap-4">
					<div className="flex flex-col">
						<p className="text-md font-bold text-black">
							Are you able to travel to Downtown Toronto for
							SummerHacks?*
						</p>
						<p className="text-sm text-black/60">
							At least one member of your team must be in-person on Sunday for judging.
						</p>
					</div>
					<div className="flex w-full">
						<AppComboBox
							items={yesNoOptions}
							placeholder="Select yes or no"
							value={formData.travelToDowntownToronto}
							onValueChange={(value) =>
								onFieldChange("travelToDowntownToronto", value ?? "")
							}
						/>
					</div>
				</div>
			</div>
		);
	}

	return null;
}
