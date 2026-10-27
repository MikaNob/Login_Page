import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { cssInterop } from 'nativewind';

// Lets icons take their color and size from className, like every other element
const InteropIcon = cssInterop(Ionicons, {
  className: { target: 'style', nativeStyleToProp: { color: true, fontSize: 'size' } },
});

// null skips Ionicons' default 12px inline size, which would beat the className size on web
export function Icon(props: React.ComponentProps<typeof InteropIcon>) {
  return <InteropIcon size={null as unknown as number} {...props} />;
}
