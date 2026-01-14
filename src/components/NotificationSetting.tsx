import axios from "axios";
import { useState } from "react";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export function NotificationSettings({ setIsSettingOpen }: any) {
  const [emailEnabled, setEmailEnabled] = useState(true);
  const [smsEnabled, setSmsEnabled] = useState(false);
  const [phone, setPhone] = useState("");
  const [reminderTime, setReminderTime] = useState("09:00");

  async function handleSave() {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/user/notification/update`,
        { emailEnabled, smsEnabled, phone, reminderTime },
        {
          headers: { Authorization: localStorage.getItem("token") },
        }
      );
      const data = await response.data;
      alert(data.message);
      setIsSettingOpen(false);
    } catch (error) {
      console.log("error in the setting the notification");
    }
  }

  return (
    <div className="max-w-xl mx-auto bg-gray-50 border border-black/10 rounded-2xl shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-black/10">
        <h2 className="text-lg font-semibold text-black">
          Notification Settings
        </h2>

        <button
          onClick={() => setIsSettingOpen(false)}
          className="text-sm text-gray-500 hover:text-black transition"
        >
          ✕
        </button>
      </div>

      {/* Content */}
      <div className="p-6 space-y-6 text-sm">
        {/* Email toggle */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="font-medium text-black">Email Reminders</p>
            <p className="text-gray-600">Receive daily reminder emails</p>
          </div>

          <input
            type="checkbox"
            checked={emailEnabled}
            onChange={(e) => setEmailEnabled(e.target.checked)}
            className="mt-1 h-5 w-5 accent-black"
          />
        </div>

        {/* SMS toggle */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="font-medium text-black">SMS Reminders</p>
            <p className="text-gray-600">Get reminders via SMS</p>
          </div>

          <input
            type="checkbox"
            checked={smsEnabled}
            onChange={(e) => setSmsEnabled(e.target.checked)}
            className="mt-1 h-5 w-5 accent-black"
          />
        </div>

        {/* Phone number */}
        {smsEnabled && (
          <div>
            <label className="block font-medium text-black mb-1">
              Phone Number
            </label>
            <input
              type="text"
              placeholder="+91XXXXXXXXXX"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="
                w-full px-4 py-2
                rounded-lg
                border border-black/20
                bg-white
                text-black
                focus:outline-none
                focus:ring-2
                focus:ring-black
              "
            />
          </div>
        )}

        {/* Reminder time */}
        <div>
          <label className="block font-medium text-black mb-1">
            Reminder Time
          </label>
          <input
            type="time"
            value={reminderTime}
            onChange={(e) => setReminderTime(e.target.value)}
            className="
              w-full px-4 py-2
              rounded-lg
              border border-black/20
              bg-white
              text-black
              focus:outline-none
              focus:ring-2
              focus:ring-black
            "
          />
          <p className="text-gray-600 mt-1">
            You’ll receive reminders daily at this time
          </p>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-black/10">
          <button
            onClick={() => setIsSettingOpen(false)}
            className="px-4 py-2 rounded-lg text-gray-600 hover:text-black transition"
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            className="
              inline-flex items-center gap-2
              px-6 py-2.5
              rounded-full
              bg-black
              text-white
              font-medium
              hover:bg-black/90
              transition
            "
          >
            ✦ Save Settings
          </button>
        </div>
      </div>
    </div>
  );
}
