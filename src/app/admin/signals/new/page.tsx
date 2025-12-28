'use client'

import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import { SimpleSignalForm } from '@/components/admin/simple-signal-form'

export default function NewSignalPage() {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-clear-signal mb-2 flex items-center gap-3">
          <Sparkles className="w-7 h-7 text-profit-pulse" />
          Create New Signal
        </h1>
        <p className="text-market-mist">Create beautiful, professional trading signals</p>
      </div>
      <SimpleSignalForm />
    </motion.div>
  )
}