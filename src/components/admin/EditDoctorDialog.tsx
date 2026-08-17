"use client";

import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Button } from "../ui/button";
import { formatPhoneNumber } from "../../lib/utils";
import { useUpdateDoctor } from "../../hooks/use-doctors";
import { Doctor, Gender } from "@prisma/client";

interface EditDoctorDialogProps {
	isOpen: boolean;
	onClose: () => void;
	doctor: Doctor | null;
}

function EditDoctorDialog({ isOpen, onClose, doctor }: EditDoctorDialogProps) {
	const [form, setForm] = useState({
		id: "",
		name: "",
		email: "",
		phone: "",
		specialty: "",
		gender: "MALE" as Gender,
		isActive: true,
	});

	const updateMutation = useUpdateDoctor();

	useEffect(() => {
		if (doctor) {
			setForm({
				id: doctor.id,
				name: doctor.name,
				email: doctor.email,
				phone: doctor.phone,
				specialty: (doctor as any).specialty || "",
				gender: doctor.gender as Gender,
				isActive: doctor.isActive,
			});
		}
	}, [doctor]);

	const handlePhoneChange = (value: string) => {
		setForm({ ...form, phone: formatPhoneNumber(value) });
	};

	const handleSave = () => {
		updateMutation.mutate(form, { onSuccess: onClose });
	};

	const handleClose = () => {
		onClose();
	};

	if (!doctor) return null;

	return (
		<Dialog open={isOpen} onOpenChange={handleClose}>
			<DialogContent className="sm:max-w-[500px]">
				<DialogHeader>
					<DialogTitle>Edit Doctor</DialogTitle>
				</DialogHeader>

				<div className="grid gap-4 py-4">
					<div className="space-y-2">
						<Label htmlFor="edit-name">Name</Label>
						<Input id="edit-name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
					</div>

					<div className="space-y-2">
						<Label htmlFor="edit-specialty">Specialty</Label>
						<Input
							id="edit-specialty"
							value={form.specialty}
							onChange={(e) => setForm({ ...form, specialty: e.target.value })}
						/>
					</div>

					<div className="space-y-2">
						<Label htmlFor="edit-email">Email</Label>
						<Input id="edit-email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
					</div>

					<div className="space-y-2">
						<Label htmlFor="edit-phone">Phone</Label>
						<Input id="edit-phone" value={form.phone} onChange={(e) => handlePhoneChange(e.target.value)} />
					</div>

					<div className="grid grid-cols-2 gap-4">
						<div className="space-y-2">
							<Label htmlFor="edit-gender">Gender</Label>
							<Select value={form.gender || ""} onValueChange={(value) => setForm({ ...form, gender: value as Gender })}>
								<SelectTrigger>
									<SelectValue />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="MALE">Male</SelectItem>
									<SelectItem value="FEMALE">Female</SelectItem>
								</SelectContent>
							</Select>
						</div>

						<div className="space-y-2">
							<Label htmlFor="edit-status">Status</Label>
							<Select value={form.isActive ? "active" : "inactive"} onValueChange={(value) => setForm({ ...form, isActive: value === "active" })}>
								<SelectTrigger>
									<SelectValue />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="active">Active</SelectItem>
									<SelectItem value="inactive">Inactive</SelectItem>
								</SelectContent>
							</Select>
						</div>
					</div>
				</div>

				<DialogFooter>
					<Button variant="outline" onClick={handleClose}>
						Cancel
					</Button>
					<Button onClick={handleSave} disabled={updateMutation.isPending}>
						{updateMutation.isPending ? "Saving..." : "Save"}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}

export default EditDoctorDialog;
