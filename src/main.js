import { inject } from '@vercel/analytics'
import { injectSpeedInsights } from '@vercel/speed-insights'
import '~/scripts/3d_text'

injectSpeedInsights()
inject()
