import {
  Html, Head, Body, Container, Section, Text, Hr, Link
} from '@react-email/components'

interface Props {
  order: any
}

export function PurchaseConfirmEmail({ order }: Props) {
  return (
    <Html>
      <Head />
      <Body style={{ backgroundColor: '#000000', fontFamily: 'Arial, sans-serif' }}>
        <Container style={{ maxWidth: '560px', margin: '0 auto', padding: '40px 20px' }}>
          <Text style={{ color: '#ffffff', fontSize: '11px', letterSpacing: '0.4em', textTransform: 'uppercase', marginBottom: '32px' }}>
            {process.env.NEXT_PUBLIC_APP_NAME || 'PHYGITAL STREETWEAR'}
          </Text>

          <Hr style={{ borderColor: '#1a1a1a', marginBottom: '32px' }} />

          <Text style={{ color: '#ffffff', fontSize: '24px', fontWeight: '300', marginBottom: '8px' }}>
            Order Confirmed
          </Text>
          <Text style={{ color: '#71717a', fontSize: '14px', marginBottom: '32px' }}>
            Your reservation is secured.
          </Text>

          <Section style={{ border: '1px solid #1a1a1a', padding: '24px', marginBottom: '32px' }}>
            <Text style={{ color: '#71717a', fontSize: '10px', letterSpacing: '0.4em', textTransform: 'uppercase', marginBottom: '8px' }}>
              Drop
            </Text>
            <Text style={{ color: '#ffffff', fontSize: '18px', fontWeight: '300', marginBottom: '16px' }}>
              {order.drop.name}
            </Text>
            <Text style={{ color: '#71717a', fontSize: '12px' }}>
              {order.product.name} · Size {order.size}
            </Text>
          </Section>

          <Text style={{ color: '#71717a', fontSize: '12px', marginBottom: '8px' }}>
            Your NFT certificate will be minted automatically on Polygon and emailed to you shortly.
          </Text>

          <Hr style={{ borderColor: '#1a1a1a', margin: '32px 0' }} />

          <Link href={`${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/dashboard`}
            style={{ color: '#ffffff', fontSize: '11px', letterSpacing: '0.3em', textTransform: 'uppercase' }}>
            View Owner Dashboard →
          </Link>
        </Container>
      </Body>
    </Html>
  )
}
