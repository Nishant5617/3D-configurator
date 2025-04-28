import React from 'react';
import { QRCodeSVG } from 'qrcode.react';

const QRCodeModal = ({ isOpen, onClose, arUrl }) => {
  if (!isOpen) return null;

  return (
    <div className="qr-modal-overlay" style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000
    }}>
      <div className="qr-modal-content" style={{
        backgroundColor: 'white',
        padding: '30px',
        borderRadius: '8px',
        maxWidth: '90%',
        width: '400px',
        textAlign: 'center',
        position: 'relative',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)'
      }}>
        <button 
          className="close-button" 
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '10px',
            right: '15px',
            background: 'none',
            border: 'none',
            fontSize: '24px',
            cursor: 'pointer',
            color: '#666'
          }}
        >
          ×
        </button>
        
        <h3 style={{ fontSize: '20px', marginBottom: '20px', color: '#333' }}>
          Scan QR Code for AR View
        </h3>
        
        <div className="qr-code-container" style={{
          margin: '0 auto',
          padding: '15px',
          backgroundColor: 'white',
          borderRadius: '8px',
          display: 'inline-block',
          border: '1px solid #eee'
        }}>
          <QRCodeSVG 
            value={arUrl} 
            size={250}
            level="H" // Higher error correction
            includeMargin={true}
          />
        </div>
        
        <p style={{ 
          margin: '20px 0', 
          color: '#555',
          lineHeight: '1.5'
        }}>
          Scan this code with your mobile device to view the model in AR
        </p>
        
        <div style={{ 
          fontSize: '14px', 
          color: '#777',
          padding: '10px',
          backgroundColor: '#f7f7f7',
          borderRadius: '4px' 
        }}>
          <strong>Tip:</strong> Open your camera app and point it at the QR code
        </div>
      </div>
    </div>
  );
};

export default QRCodeModal;