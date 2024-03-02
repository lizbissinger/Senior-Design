import React from "react";
import { Dialog, DialogPanel, Button } from "@tremor/react";

interface EmailPreviewProps {
  emailContent: string;
  onClose: () => void;
  onSend: () => void;
}

const EmailPreview: React.FC<EmailPreviewProps> = ({
  emailContent,
  onClose,
  onSend,
}) => {
  return (
    <Dialog open={true} onClose={onClose} static={true}>
      <DialogPanel>
        <h3 className="text-lg font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
          Email Preview
        </h3>
        <div dangerouslySetInnerHTML={{ __html: emailContent }} />
        <Button className="mt-8 w-full" onClick={onSend}>
          Send Email
        </Button>
        <Button variant="light" className="mt-4 w-full" onClick={onClose}>
          Close
        </Button>
      </DialogPanel>
    </Dialog>
  );
};

export default EmailPreview;
