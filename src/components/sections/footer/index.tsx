import { cn } from '@/lib/utils';
import css from './footer.module.css';

export function Footer() {
  return (
    <footer className={cn(css.footer)}>
      <span className={cn('font-mono', css['footer-text'])}>johndoe</span>
      <div className={cn(css['footer-grid'])} />
      <div className={cn(css['footer-gradient'])} />
    </footer>
  );
}
