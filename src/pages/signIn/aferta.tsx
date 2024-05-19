import { afertaData, privacyPolicy } from './afertaData';
export function Aferta() {
  return <div dangerouslySetInnerHTML={{ __html: afertaData }} />;
}
export function PrivacyPolicy() {
  return <div dangerouslySetInnerHTML={{ __html: privacyPolicy }} />;
}
