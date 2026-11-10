import type { ReactNode } from "react";
import { Pressable, Text, View } from "react-native";
import { primaryButtonStyles } from "./PrimaryButton.styles";
import { usePrimaryButton } from "./usePrimaryButton";

interface PrimaryButtonProps {
  label: string;
  testID?: string;
  onPress: () => void;
  disabled?: boolean;
  fullWidth?: boolean;
  size?: "md" | "sm";
  leftIcon?: ReactNode;
}

export function PrimaryButton({
  label,
  testID,
  onPress,
  disabled,
  fullWidth,
  size = "md",
  leftIcon,
}: PrimaryButtonProps) {
  const { handlePress } = usePrimaryButton({ onPress, disabled });

  return (
    <Pressable
      testID={testID}
      onPress={handlePress}
      disabled={disabled}
      style={({ pressed }) => [
        primaryButtonStyles.button,
        fullWidth ? primaryButtonStyles.fullWidth : null,
        disabled ? primaryButtonStyles.buttonDisabled : null,
        pressed && !disabled ? primaryButtonStyles.pressed : null,
      ]}
      accessibilityRole="button"
      accessibilityState={{ disabled }}
    >
      <View style={primaryButtonStyles.contentRow}>
        {leftIcon}
        <Text
          style={[
            primaryButtonStyles.label,
            size === "sm" ? primaryButtonStyles.labelSmall : null,
          ]}
        >
          {label}
        </Text>
      </View>
    </Pressable>
  );
}
