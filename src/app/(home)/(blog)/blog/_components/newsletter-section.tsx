import { NewsletterForm } from '@/app/(home)/(blog)/newsletter/components/newsletter-form'
import { Section } from '@/components/section'
import { ViewAnimation } from '@/components/view-animation'

export function NewsletterSection() {
  return (
    <Section className='bg-dashed'>
      <div className='grid gap-6 px-6 py-10 md:grid-cols-2 md:items-center md:gap-10 md:py-14'>
        <ViewAnimation
          initial={{ opacity: 0, translateY: -6 }}
          whileInView={{ opacity: 1, translateY: 0 }}
        >
          <div className='space-y-2'>
            <h3 className='font-semibold text-lg'>
              Subscribe to the newsletter
            </h3>
            <p className='text-muted-foreground text-sm'>
              Get notified when I publish new posts. No spam, unsubscribe
              anytime.
            </p>
          </div>
        </ViewAnimation>
        <ViewAnimation
          delay={0.1}
          initial={{ opacity: 0, translateY: -6 }}
          whileInView={{ opacity: 1, translateY: 0 }}
        >
          <NewsletterForm />
        </ViewAnimation>
      </div>
    </Section>
  )
}
