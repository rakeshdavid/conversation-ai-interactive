import { Select, SelectContent, SelectTrigger, SelectItem } from '../ui/select';
import { ChevronDown } from 'lucide-react';

export const SelectDevice = ({ value, devices, onChange, Icon }: {
  value: string | undefined;
  devices: { device: MediaDeviceInfo }[];
  onChange: (value: string) => void;
  Icon: React.ElementType;
}) => {
  // Find the current device name to display
  const currentDevice = devices.find(({ device }) => device.deviceId === value);
  // Set a default display name even if no device is selected
  // If there's only one device available, display it as the default
  const displayName = currentDevice?.device.label || 
    (devices.length === 1 ? devices[0].device.label : 'Select device');

  return (
    <Select
      value={value}
      onValueChange={onChange}
    >
      <SelectTrigger 
        className='h-10 rounded-md border-none bg-gradient-to-r from-[rgba(var(--color-deep-purple),0.7)] to-[rgba(var(--color-teal),0.7)] text-white shadow-md hover:from-[rgba(var(--color-deep-purple),0.8)] hover:to-[rgba(var(--color-teal),0.8)] transition-all duration-300 min-w-[10rem]'
      >
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2 truncate">
            <Icon size={18} className="text-black flex-shrink-0" />
            <span className="truncate font-medium text-black">{displayName}</span>
          </div>
          <ChevronDown className="ml-2 h-4 w-4 opacity-70 text-black flex-shrink-0" />
        </div>
      </SelectTrigger>
      <SelectContent 
        className='z-50 bg-white/95 backdrop-blur-sm border border-[rgba(var(--color-teal),0.3)] rounded-md shadow-lg'
      >
        {devices.map(({ device }) => (
          <SelectItem
            key={device.deviceId}
            value={device.deviceId}
            className="hover:bg-[rgba(var(--color-teal),0.1)] rounded-sm text-sm py-2 cursor-pointer font-medium focus:bg-[rgba(var(--color-teal),0.2)] focus:text-[rgb(var(--color-deep-purple))] data-[state=checked]:bg-[rgba(var(--color-teal),0.2)] data-[state=checked]:text-[rgb(var(--color-deep-purple))] text-black"
          >
            {device.label || `Device ${device.deviceId.slice(0, 5)}...`}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}