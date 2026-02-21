import { AnimatePresence, motion } from 'framer-motion';
import { useUiStore } from '@/store/uiStore';

export function ToastContainer() {
  const { toasts, removeToast } = useUiStore();

  return (
    <div className="fixed right-4 top-4 z-50 space-y-2">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            onAnimationComplete={() => setTimeout(() => removeToast(toast.id), 2500)}
            className="glass-card px-4 py-2 text-sm"
          >
            {toast.message}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
