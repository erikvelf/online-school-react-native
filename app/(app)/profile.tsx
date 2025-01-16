import { View, Text, Alert, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Button } from "../../shared/Button/Button";
import { useState } from "react";
import {
	useCameraPermissions,
	PermissionStatus,
	useMediaLibraryPermissions,
} from "expo-image-picker";

export default function Profile() {
	const [image, setImage] = useState<string | null>(null);
	const [cameraPermissions, requestCameraPermission] = useCameraPermissions();
	const [libraryPermissions, requestLibraryPermissions] =
		useMediaLibraryPermissions();

	const verifyCameraPermissions = async () => {
		if (cameraPermissions?.status === PermissionStatus.UNDETERMINED) {
			const res = await requestCameraPermission();
			return res.granted;
		}
		if (cameraPermissions?.status === PermissionStatus.DENIED) {
			Alert.alert("Not enough permissions to acces the camera");
			return false;
		}
		return true;
	};

	const verifyMediaPermissions = async () => {
		if (libraryPermissions?.status === PermissionStatus.UNDETERMINED) {
			const res = await requestLibraryPermissions();
			return res.granted;
		}

		if (libraryPermissions?.status === PermissionStatus.DENIED) {
			Alert.alert("Not enough permissions to acces the media library");
			return false;
		}
		return true;
	};

	const captureAvatar = async () => {
		const isPerissionGranted = await verifyCameraPermissions();
		if (!isPerissionGranted) {
			return;
		}
		const result = await ImagePicker.launchCameraAsync({
			mediaTypes: ["images"],
			allowsEditing: true,
			aspect: [1, 1],
			quality: 0.5,
		});
		if (!result.assets) {
			return;
		}
		setImage(result?.assets[0].uri);
	};

	const pickAvatar = async () => {
		const isPerissionGranted = await verifyMediaPermissions();
		if (!isPerissionGranted) {
			return;
		}
		const result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ["images"],
			allowsEditing: true,
			aspect: [1, 1],
			quality: 0.5,
		});
		if (!result.assets) {
			return;
		}
		setImage(result?.assets[0].uri);
	};

	return (
		<View>
			<Text>Profile</Text>
			<Button text="Capture avatar" onPress={captureAvatar} />
			<Button text="Pick avatar from media library" onPress={pickAvatar} />
			{image && (
				<Image
					source={{
						uri: image,
						width: 100,
						height: 100,
					}}
				/>
			)}
		</View>
	);
}
